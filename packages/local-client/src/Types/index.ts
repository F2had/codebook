
export type CellType = 'markdown' | 'code';
export type CellDirection = 'up' | 'down';
export interface Cell {
    id: string;
    type: CellType;
    content: string;
}