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
          placeholder="Warehouse Name"
        />
        <ErrorMessage name="name" class="text-red-500 text-sm" />

        <!-- Location -->
        <Field
          name="location"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
          placeholder="Location (optional)"
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

        <!-- Status (isActive) -->
        <Field
          name="isActive"
          as="select"
          class="w-full px-4 py-2 bg-neutralGrayBerry/50 text-offWhiteBerry rounded-lg focus:ring-2 focus:ring-accentOrangeBerry"
        >
          <option :value="null" disabled>Select Status</option>
          <option :value="true">Active</option>
          <option :value="false">Inactive</option>
        </Field>
        <ErrorMessage name="isActive" class="text-red-500 text-sm" />

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
  createWarehouseSchema,
  IWarehouse,
  IWarehouseCreatePayload,
  IWarehouseUpdatePayload,
  updateWarehouseSchema,
} from '@berry/shared';
import { useWarehouseStore } from '../../stores/warehouse.store';

// Props and emits
const props = defineProps<{
  mode: 'create' | 'edit';
  warehouse?: Partial<IWarehouse>;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Get warehouse store
const warehouseStore = useWarehouseStore();

// Create validation schema based on mode
const validationSchema = computed(() => {
  return toTypedSchema(
    props.mode === 'create' ? createWarehouseSchema : updateWarehouseSchema
  );
});

// Set initial values based on provided warehouse data or defaults
const initialValues = computed(() => {
  if (props.mode === 'edit' && props.warehouse) {
    return {
      name: props.warehouse.name,
      location: props.warehouse.location,
      capacity: props.warehouse.capacity,
      isActive: props.warehouse.isActive ?? true, // default to true if undefined
    };
  }

  return {
    name: '',
    location: '',
    capacity: undefined,
    isActive: true, // default to active
  };
});

// Form submit handler
const onSubmit = async (
  values: IWarehouseCreatePayload | IWarehouseUpdatePayload
) => {
  try {
    if (props.mode === 'create') {
      await warehouseStore.create(values as IWarehouseCreatePayload);
    } else if (props.mode === 'edit' && props.warehouse?.id) {
      await warehouseStore.update(
        props.warehouse.id,
        values as IWarehouseUpdatePayload
      );
    }

    // Just close the modal after successful operation
    emit('close');
  } catch (error) {
    console.error('Failed to submit warehouse form:', error);
  }
};
</script>
