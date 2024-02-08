// import { Mobster } from '@prisma/client'
// import { MobsterPutData } from '@/lib/mobsters/types'

// /// PATCH ////
// type ItemUpdateFunctionGeneric<Data, ReturnData> = ({
//     data,
//     id,
// }: {
//     data: Data
//     id: number
// }) => Promise<ReturnData>

// export type ItemPatchFunction = ItemUpdateFunctionGeneric<
//     MobsterPutData,
//     Mobster
// >

// /// GET BY ID ////
// export type ItemGetByIdFunction = (id: number) => Promise<Mobster | null>

// /// PUT / ADD ////
// export type ItemAddFunctionGeneric<Data, ReturnData> = (
//     data: Data
// ) => Promise<ReturnData | null>

// export type ItemAddFunction = ItemAddFunctionGeneric<MobsterPutData, Mobster>
