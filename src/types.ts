


export type Tool = 'hand' | 'pen' | 'sticky' | 'emoji' | null


export type BoardItem = {
    id: string
    type: 'sticky' | 'emoji'
    src?: string
    x: number
    y: number
}


export type EmojiSubMode = 'stamp' | 'wand'


export type WandEmoji = {
    id: string
    src: string
    x: number
    y: number
    rotation: number
    bornAt: number
    floatAngle: number
}
