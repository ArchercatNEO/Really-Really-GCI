export interface GrassCube {
    posX: number;
    posY: number;
    collectGrass(): void;
}

export interface GrassField {
    growSpeed(): number;
    grassCap(): number;
    cutterLength(): number;

    spawnGrass(canvas: HTMLCanvasElement): GrassCube;
}
