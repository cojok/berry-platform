<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-blackBerry/80 backdrop-blur-md"
  >
    <div
      class="bg-blackBerry/60 border border-neutralGrayBerry/40 p-6 rounded-xl shadow-lg w-96"
    >
      <h2 class="text-xl font-heading font-semibold text-offWhiteBerry/90 mb-4">
        {{ mode === 'create' ? 'Create Warehouse' : 'Edit Warehouse' }}
      </h2>

      <Form
        :validation-schema="schema"
        @submit="onSubmit"
        class="space-y-4"
        v-slot="{ errors }"
      >
        <!-- Name -->
        <Field
          name="name"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
          placeholder="Warehouse Name"
        />
        <ErrorMessage name="name" class="text-red-500 text-sm" />

        <!-- Location -->
        <Field
          name="location"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
          placeholder="Location"
        />
        <ErrorMessage name="location" class="text-red-500 text-sm" />

        <!-- Capacity -->
        <Field
          name="capacity"
          type="number"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
          placeholder="Capacity"
        />
        <ErrorMessage name="capacity" class="text-red-500 text-sm" />

        <div class="mt-4 flex justify-between">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-neutralGrayBerry/60 text-offWhiteBerry rounded-lg hover:bg-neutralGrayBerry/50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-accentOrangeBerry text-offWhiteBerry font-semibold rounded-lg shadow-md hover:bg-orange-500 transition"
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
import * as yup from 'yup';
import { IWarehouse } from '@berry/shared';

// Props and emits
const props = defineProps<{
  mode: 'create' | 'edit';
  warehouse?: IWarehouse;
}>();
const emit = defineEmits<{
  (e: 'submitted', value: IWarehouse): void;
  (e: 'close'): void;
}>();

// Schema
const schema = yup.object({
  name: yup.string().required('Name is required'),
  location: yup.string().required('Location is required'),
  capacity: yup.number().required('Capacity is required'),
});

// Submit handler
const onSubmit = (values: Record<string, any>, { resetForm }: any): void => {
  emit('submitted', values as IWarehouse);
};
</script>
