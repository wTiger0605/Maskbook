import type { PersonaInformation } from '@masknet/shared-base'

export enum SignAccountType {
    Wallet = 'Wallet',
    Persona = 'Persona',
}

export interface SignAccount {
    type: SignAccountType
    identity?: string
    name?: string
    address?: string
    raw?: SignablePersona
}

export type SignablePersona = PersonaInformation & { address?: string }
