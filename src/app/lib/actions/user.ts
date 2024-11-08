"use server"

import prisma from "../prisma"

export async function getUserById(userId: string) {

    return await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

}

export async function UpdateUserAvatar(avatarUrlParam: File, userId: string) {

    return await prisma.user.update( {
        where:{
            id: userId
        },
        data: {
            avatarUrl: avatarUrlParam
        }
    })
}