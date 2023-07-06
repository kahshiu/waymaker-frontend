import { IResultField, IFormContext } from "../interfaces/IFormContext.ts";

/**
 * NOTE: MY Phone numbers
 * 01 - mobile phone numbers, 011, 012, 013...
 * 02 - **formerly Singapore
 * 03 - Selangor, KL, Putrajaya, Pahang (Genting Highlands)
 * 04 - Perlis, Kedah Penang, Perak (Pengkalan Hulu)
 * 05 - Perak, Pahang (Cameron Highlands), Selangor (Hulu Bernam)
 * 06 - Negeri Sembilan, Malacca, Johor (Muar), Johor (Tangkak)
 * 07 - Johor, Negeri Sembilan (Gemas)
 * 080 - **Brunei
 * 081 - **Reserved
 * 082 - Swak (Kuching, Samarahan, Serian)
 * 083 - Swak (Sri Aman, Betong)
 * 084 - Swak (Sibu, Sarikei, Mkah, Kapit)
 * 085 - Swak (Miri, Limbang Lawas)
 * 086 - Swak (Bintulu, Belaga)
 * 087 - Labuan, Sabah
 * 088 - Sabah (Kota Kinabalu, Kudat)
 * 089 - Sabah (Lahad Datu, Sandakan, Tawau)
 * 09 - Pahang, Terengganu, Kelantan
 */

export const MYPhoneMasking = (
  field: IResultField,
  formContext: IFormContext
) => {
  const value = field.data.value;

  return value.replace(
    /(\d{2})(\d{4})(\d{1,})/,
    (match: string, p1: string, p2: string, p3: string) => {
      const is2 = ["03", "03", "04", "05", "06", "07", "09"].includes(p1);
      const is3 = ["01", "08"].includes(p1);

      if (is2) {
        return `${p1}-${p2} ${p3}`;
      } else if (is3) {
        const _p1 = p1 + p2[0];
        const _p2 = p2.slice(1) + p3[0];
        const _p3 = p3.slice(1);
        return `${_p1}-${_p2} ${_p3}`;
      } else {
        return `${p1}${p2}${p3}`;
      }
    }
  );
};

export const MYIdentiyCardMasking = (
  field: IResultField,
  formContext: IFormContext
) => {
  const value = field.data.value;

  return value.replace(
    /(\d{6})(\d{2})(\d{2})/,
    (match: string, p1: string, p2: string, p3: string) => {
      return `${p1}-${p2}-${p3}`;
    }
  );
};
