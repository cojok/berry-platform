import { computed, ref, Ref } from 'vue';

const TWO_DIGIT_THRESHOLD = 10;
const ADD_0_BEFORE_SINGLE_DIGIT = (num: number): string | number =>
  num < TWO_DIGIT_THRESHOLD ? `0${num}` : num;

export const useDateFormat = (
  date: Date | string,
  format = 'yyyy-MM-dd'
): { formattedDate: Ref<string> } => {
  const dateRef = ref(new Date(date));

  const formattedDate = computed(() => {
    let formatted = '';
    switch (format) {
      case 'yyyy-MM-dd':
        formatted = `${dateRef.value.getFullYear()}-${ADD_0_BEFORE_SINGLE_DIGIT(
          dateRef.value.getMonth() + 1
        )}-${ADD_0_BEFORE_SINGLE_DIGIT(dateRef.value.getDate())}`;
        break;
      case 'MM/dd/yyyy':
        formatted = `${ADD_0_BEFORE_SINGLE_DIGIT(
          dateRef.value.getMonth() + 1
        )}/${ADD_0_BEFORE_SINGLE_DIGIT(
          dateRef.value.getDate()
        )}/${dateRef.value.getFullYear()}`;
        break;
      case 'dd.mm.yyyy':
        formatted = `${ADD_0_BEFORE_SINGLE_DIGIT(
          dateRef.value.getDate()
        )}.${ADD_0_BEFORE_SINGLE_DIGIT(
          dateRef.value.getMonth() + 1
        )}.${dateRef.value.getFullYear()}`;
        break;
      default:
        formatted = dateRef.value.toLocaleDateString();
        break;
    }
    return formatted;
  });

  return { formattedDate };
};
