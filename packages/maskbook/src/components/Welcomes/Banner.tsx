import { useState, useCallback } from 'react'
import { useI18N } from '../../utils/i18n-next-ui'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Button, Theme, ListItemText, ListItemIcon } from '@material-ui/core'
import { useLastRecognizedIdentity } from '../DataSource/useActivatedUI'
import classNames from 'classnames'
import Services from '../../extension/service'
import { getActivatedUI } from '../../social-network/ui'
import { setStorage } from '../../utils/browser.storage'
import { useStylesExtends } from '../custom-ui-helper'
import { MaskbookIcon } from '../../resources/MaskbookIcon'
import { DashboardRoute } from '../../extension/options-page/Route'

interface BannerUIProps
    extends withClasses<KeysInferFromUseStyles<typeof useStyles> | 'header' | 'content' | 'actions' | 'button'> {
    title?: string
    description?: string
    nextStep: 'hidden' | { onClick(): void }
    username?:
        | 'hidden'
        | {
              isValid(username: string): boolean
              value: string
              defaultValue: string
              onChange(nextValue: string): void
          }
}
const useStyles = makeStyles((theme: Theme) => {
    const network = getActivatedUI()?.networkIdentifier
    return {
        root: {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 4,
            marginBottom: 10,
            ...(network === 'twitter.com'
                ? {
                      borderRadius: 0,
                      borderStyle: 'solid none none none',
                      borderTop: `1px solid ${theme.palette.type === 'dark' ? '#2f3336' : '#e6ecf0'}`,
                      paddingBottom: 10,
                      marginBottom: 0,
                      boxShadow: 'none',
                  }
                : null),
        },
        title: {
            color: theme.palette.text.primary,
            paddingBottom: 0,
        },
        wrapper: {
            margin: theme.spacing(1),
            display: 'flex',
            alignItems: 'center',
        },
        maskicon: {
            width: 56,
            height: 56,
            margin: theme.spacing(0, 1),
        },
        buttonText: {
            [theme.breakpoints.down('sm')]: {
                fontSize: '10px',
                lineHeight: 1.4,
                padding: '20px 14px !important',
            },
        },
    }
})

export function BannerUI(props: BannerUIProps) {
    const { t } = useI18N()
    const classes = useStylesExtends(useStyles(), props)
    return (
        <Paper style={{ paddingBottom: 0 }} classes={{ root: classes.root }}>
            <div className={classes.wrapper}>
                <ListItemIcon>
                    <MaskbookIcon className={classes.maskicon}></MaskbookIcon>
                </ListItemIcon>
                <ListItemText
                    className={classes.header}
                    classes={{ primary: classes.title, secondary: classes.content }}
                    primary={props.title ?? t('banner_title')}
                    secondary={props.description ?? t('banner_preparing_setup')}></ListItemText>
                {props.nextStep === 'hidden' ? null : (
                    <Button
                        className={classNames(classes.button, classes.buttonText)}
                        onClick={props.nextStep.onClick}
                        variant="contained">
                        {t('banner_get_started')}
                    </Button>
                )}
            </div>
        </Paper>
    )
}

export interface BannerProps extends Partial<BannerUIProps> {}

export function Banner(props: BannerProps) {
    const lastRecognizedIdentity = useLastRecognizedIdentity()
    const { nextStep } = props
    const networkIdentifier = getActivatedUI()?.networkIdentifier

    const [value, onChange] = useState('')
    const defaultNextStep = useCallback(() => {
        if (nextStep === 'hidden') return
        if (!networkIdentifier) {
            nextStep?.onClick()
            nextStep ?? console.warn('You must provide one of networkIdentifier or nextStep.onClick')
            return
        }
        setStorage(networkIdentifier, { forceDisplayWelcome: false })
        Services.Welcome.openOptionsPage(DashboardRoute.Setup)
    }, [networkIdentifier, nextStep])
    const defaultUserName = networkIdentifier
        ? {
              defaultValue: lastRecognizedIdentity.identifier.isUnknown ? '' : lastRecognizedIdentity.identifier.userId,
              value,
              onChange,
              isValid: getActivatedUI().isValidUsername,
          }
        : ('hidden' as const)
    return (
        <BannerUI
            {...props}
            username={props.username ?? defaultUserName}
            nextStep={props.nextStep ?? { onClick: defaultNextStep }}
        />
    )
}
