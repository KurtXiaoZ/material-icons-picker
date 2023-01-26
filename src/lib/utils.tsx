import { MATERIAL_ICONS } from '../assets/materialIcons';

export const searchMaterialIcons = (searchValue: string): any =>
    searchValue ? MATERIAL_ICONS.filter((s) => s.toLowerCase().includes(searchValue)) : MATERIAL_ICONS;
