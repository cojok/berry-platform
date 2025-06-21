<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-blackBerry/80 backdrop-blur-md"
  >
    <div
      class="bg-blackBerry/60 border border-neutralGrayBerry/40 p-6 rounded-xl shadow-lg w-96"
    >
      <h2 class="text-xl font-heading font-semibold text-offWhiteBerry/90 mb-4">
        {{ mode === 'create' ? 'Create Stock Item' : 'Edit Stock Item' }}
      </h2>

      <Form
        :validation-schema="validationSchema"
        @submit="onSubmit"
        class="space-y-4"
        v-slot="{ errors }"
        :initial-values="initialValues"
      >
        <!-- Name -->
        <Field
          name="name"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
          placeholder="Item Name"
        />
        <ErrorMessage name="name" class="text-red-500 text-sm" />

        <!-- Description -->
        <Field
          name="description"
          as="textarea"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
          placeholder="Description"
          rows="3"
        />
        <ErrorMessage name="description" class="text-red-500 text-sm" />

        <!-- SKU -->
        <Field
          name="sku"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
          placeholder="SKU"
        />
        <ErrorMessage name="sku" class="text-red-500 text-sm" />

        <!-- Quantity -->
        <Field
          name="quantity"
          type="number"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
          placeholder="Quantity"
        />
        <ErrorMessage name="quantity" class="text-red-500 text-sm" />

        <!-- Minimum Quantity -->
        <Field
          name="minimumQuantity"
          type="number"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
          placeholder="Minimum Quantity"
        />
        <ErrorMessage name="minimumQuantity" class="text-red-500 text-sm" />

        <div class="mt-4 flex justify-between">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 cursor-pointer bg-neutralGrayBerry/60 text-offWhiteBerry rounded-lg hover:bg-neutralGrayBerry/50 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="px-4 py-2 cursor-pointer bg-accentOrangeBerry text-white rounded-lg hover:bg-accentOrangeBerry/80 transition"
          >
            {{ mode === 'create' ? 'Create' : 'Update' }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { computed } from 'vue';
import {
  createStockItemSchema,
  IStockItem,
  StockItemCreatePayload,
  StockItemUpdatePayload,
  updateStockItemSchema,
} from '@berry/shared';
import { useStockItemStore } from '../../stores/stock-item.store';

// Props and emits
const props = defineProps<{
  mode: 'create' | 'edit';
  stockItem?: Partial<IStockItem>;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

const stockItemStore = useStockItemStore();

const validationSchema = computed(() => {
  return toTypedSchema(
    props.mode === 'create' ? createStockItemSchema : updateStockItemSchema
  );
});

const initialValues = computed(() => {
  if (props.mode === 'edit' && props.stockItem) {
    return {
      name: props.stockItem.name,
      description: props.stockItem.description,
      sku: props.stockItem.sku,
      quantity: props.stockItem.quantity,
      minimumQuantity: props.stockItem.minimumQuantity,
    };
  }
  return {
    name: '',
    description: '',
    sku: '',
    quantity: 0,
    minimumQuantity: 0,
  };
});

const onSubmit = async (
  values: StockItemUpdatePayload | StockItemCreatePayload
) => {
  try {
    if (props.mode === 'create') {
      await stockItemStore.create(values as StockItemCreatePayload);
    } else if (props.mode === 'edit' && props.stockItem) {
      // Make sure to include the ID from the original stock item
      await stockItemStore.update({
        ...values,
        id: props.stockItem.id,
      });
    }
    emit('close'); // Close the form after successful operation
  } catch (error) {
    console.error('Failed to process stock item:', error);
  }
};
</script>
