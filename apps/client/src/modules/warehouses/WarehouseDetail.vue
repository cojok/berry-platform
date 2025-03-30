<template>
  <div v-if="warehouse">
    <h1>Warehouse Details</h1>

    <div>
      <label for="name">Warehouse Name</label>
      <input
        v-model="formData.name"
        type="text"
        id="name"
        name="name"
        :disabled="!isEditable"
      />
      <span v-if="errors.name">{{ errors.name }}</span>
    </div>

    <div>
      <label for="location">Location</label>
      <input
        v-model="formData.location"
        type="text"
        id="location"
        name="location"
        :disabled="!isEditable"
      />
      <span v-if="errors.location">{{ errors.location }}</span>
    </div>

    <div>
      <label for="capacity">Capacity</label>
      <input
        v-model="formData.capacity"
        type="number"
        id="capacity"
        name="capacity"
        :disabled="!isEditable"
      />
      <span v-if="errors.capacity">{{ errors.capacity }}</span>
    </div>

    <div>
      <label for="isActive">Active</label>
      <input
        v-model="formData.isActive"
        type="checkbox"
        id="isActive"
        name="isActive"
        :disabled="!isEditable"
      />
    </div>

    <div>
      <label for="deletedAt">Deleted At</label>
      <input
        v-model="formData.deletedAt"
        type="date"
        id="deletedAt"
        name="deletedAt"
        :disabled="!isEditable"
      />
    </div>

    <div v-if="isEditable">
      <button @click="onSubmit">Save</button>
    </div>
    <div v-else>
      <button @click="toggleEditMode">Edit</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWarehouseStore } from '@/stores/warehouse.store';
import { IWarehouse, IWarehouseUpdatePayload } from '@berry/shared';
import { warehouseUpdateSchema } from '@berry/shared/warehouse-create.zod'; // Zod schema for update
import { z } from 'zod';

const props = defineProps<{
  warehouse: IWarehouse;
}>();

const store = useWarehouseStore();
const isEditable = ref(false);

// Reactive formData object to handle warehouse details
const formData = ref<IWarehouse>({
  ...props.warehouse,
});

// Zod form validation on submit
const errors = ref<{ [key: string]: string }>({});

const validateForm = () => {
  errors.value = {}; // Reset errors

  try {
    warehouseUpdateSchema.parse(formData.value); // Zod validation
  } catch (e: any) {
    if (e instanceof z.ZodError) {
      e.errors.forEach((err) => {
        errors.value[err.path[0]] = err.message;
      });
      return false;
    }
  }
  return true;
};

// Handle form submission
const onSubmit = async () => {
  if (!validateForm()) return; // Validate before sending to store

  try {
    await store.update(
      props.warehouse.id,
      formData.value as IWarehouseUpdatePayload
    );
    isEditable.value = false; // Disable editing after successful update
  } catch (error) {
    console.error('Error updating warehouse:', error);
  }
};

// Toggle between view and edit mode
const toggleEditMode = () => {
  isEditable.value = !isEditable.value;
};
</script>

<style scoped>
/* Add styles specific to the warehouse details form */
</style>
