import { MATERIAL_ICONS } from '../assets/materialIcons';

export const searchMaterialIcons = (searchValue: string): any =>
    MATERIAL_ICONS.filter((s) => s.toLowerCase().includes(searchValue));
