<template>
  <form @submit="handleSubmit(onSubmit)" novalidate>
    <div>
      <label for="name">Warehouse Name</label>
      <input
        v-model="formData.name"
        type="text"
        id="name"
        name="name"
        placeholder="Enter warehouse name"
      />
      <span v-if="errors.name">{{ errors.name.message }}</span>
    </div>

    <div>
      <label for="location">Location</label>
      <input
        v-model="formData.location"
        type="text"
        id="location"
        name="location"
        placeholder="Enter warehouse location"
      />
      <span v-if="errors.location">{{ errors.location.message }}</span>
    </div>

    <div>
      <label for="capacity">Capacity</label>
      <input
        v-model="formData.capacity"
        type="number"
        id="capacity"
        name="capacity"
        placeholder="Enter warehouse capacity"
      />
      <span v-if="errors.capacity">{{ errors.capacity.message }}</span>
    </div>

    <div>
      <label for="isActive">Active</label>
      <input
        v-model="formData.isActive"
        type="checkbox"
        id="isActive"
        name="isActive"
      />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWarehouseStore } from '../../stores/warehouse.store';
import { useForm } from 'vee-validate';
import {
  createWarehouseSchema,
  IWarehouse,
  IWarehouseCreatePayload,
  IWarehouseUpdatePayload,
  updateWarehouseSchema,
} from '@berry/shared';

interface Props {
  warehouse: IWarehouse | null;
}

const props = withDefaults(defineProps<Props>(), {
  warehouse: null,
});

const store = useWarehouseStore();
const isUpdate = props.warehouse !== null;
const formData = ref<IWarehouseCreatePayload | IWarehouseUpdatePayload>(
  isUpdate
    ? { ...props.warehouse }
    : { name: '', location: '', capacity: undefined, isActive: true }
);

const { handleSubmit, errors } = useForm({
  validationSchema: isUpdate ? updateWarehouseSchema : createWarehouseSchema,
  initialValues: formData.value,
});

const onSubmit = async () => {
  try {
    if (isUpdate && props.warehouse) {
      await store.update(
        props.warehouse.id,
        formData.value as IWarehouseUpdatePayload
      );
    } else {
      await store.create(formData.value as IWarehouseCreatePayload);
    }
    // Reset form or provide feedback here
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
