/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from 'bn.js'
import { ContractOptions } from 'web3-eth-contract'
import { EventLog } from 'web3-core'
import { EventEmitter } from 'events'
import {
    Callback,
    PayableTransactionObject,
    NonPayableTransactionObject,
    BlockType,
    ContractEventLog,
    BaseContract,
} from './types.js'

interface EventOptions {
    filter?: object
    fromBlock?: BlockType
    topics?: string[]
}

export type OwnershipTransferred = ContractEventLog<{
    previousOwner: string
    newOwner: string
    0: string
    1: string
}>

export interface SmartPayVerifyPaymaster extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): SmartPayVerifyPaymaster
    clone(): SmartPayVerifyPaymaster
    methods: {
        APPROVE_FUNCTION_SELECTOR(): NonPayableTransactionObject<string>

        _validateCallData(opCallData: string | number[]): NonPayableTransactionObject<boolean>

        addBlockList(blockAddress: string): NonPayableTransactionObject<void>

        addStake(extraUnstakeDelaySec: number | string | BN): PayableTransactionObject<void>

        blockLists(arg0: string): NonPayableTransactionObject<boolean>

        deposit(): PayableTransactionObject<void>

        entryPoint(): NonPayableTransactionObject<string>

        getDeposit(): NonPayableTransactionObject<string>

        getHash(
            userOp: [
                string,
                number | string | BN,
                string | number[],
                string | number[],
                number | string | BN,
                number | string | BN,
                number | string | BN,
                number | string | BN,
                number | string | BN,
                string,
                string | number[],
                string | number[],
            ],
        ): NonPayableTransactionObject<string>

        mainPaymaster(): NonPayableTransactionObject<string>

        owner(): NonPayableTransactionObject<string>

        postOp(
            mode: number | string | BN,
            context: string | number[],
            actualGasCost: number | string | BN,
        ): NonPayableTransactionObject<void>

        renounceOwnership(): NonPayableTransactionObject<void>

        setEntryPoint(_entryPoint: string): NonPayableTransactionObject<void>

        token(): NonPayableTransactionObject<string>

        transferOwnership(newOwner: string): NonPayableTransactionObject<void>

        unlockStake(): NonPayableTransactionObject<void>

        validatePaymasterUserOp(
            userOp: [
                string,
                number | string | BN,
                string | number[],
                string | number[],
                number | string | BN,
                number | string | BN,
                number | string | BN,
                number | string | BN,
                number | string | BN,
                string,
                string | number[],
                string | number[],
            ],
            arg1: string | number[],
            requiredPreFund: number | string | BN,
        ): NonPayableTransactionObject<string>

        verifyingSigner(): NonPayableTransactionObject<string>

        withdrawStake(withdrawAddress: string): NonPayableTransactionObject<void>

        withdrawTo(withdrawAddress: string, amount: number | string | BN): NonPayableTransactionObject<void>
    }
    events: {
        OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter
        OwnershipTransferred(options?: EventOptions, cb?: Callback<OwnershipTransferred>): EventEmitter

        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter
    }

    once(event: 'OwnershipTransferred', cb: Callback<OwnershipTransferred>): void
    once(event: 'OwnershipTransferred', options: EventOptions, cb: Callback<OwnershipTransferred>): void
}
