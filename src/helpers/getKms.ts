export const getKms = (distance: number): number => {
  let kms = distance/100;
    kms = Math.round(kms * 100);
    kms /= 100
    return kms
}