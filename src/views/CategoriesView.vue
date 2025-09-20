<template>
  <div class="page-inner">
    <PageHeader
      title="Categories"
      :breadcrumbs="[
        { text: '', link: '#', icon: 'icon-home', class: 'nav-home' },
        { text: 'Categories', link: '#', class: 'nav-item' },
        { text: 'Categories', link: '#', class: 'nav-item' }
      ]"
    />

    <div class="col-md-12">
                <div class="card">
                  <div class="card-header">
                    <div class="card-title">Categories</div>
                  </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-12">
                        <form  @submit.prevent="handleSubmit">
                            <div class="form-group">
                              <div class="row">
                                <div class="col-md-5">
                                  <label for="categorieInput">Name Categorie</label>
                                  <input
                                    type="text"
                                    v-model="nameCategorie"
                                    class="form-control"
                                    id="categorieInput"
                                    placeholder="Name Categorie"
                                  />
                                </div>
                                <div class="col-md-5">
                                  <label for="desriptionInput">Description</label>
                                  <input
                                    type="text"
                                    v-model="description"
                                    class="form-control"
                                    id="desriptionInput"
                                    placeholder="Description"
                                  />
                                </div>
                                <div class="col-md-2 d-flex align-items-end">
                                  <button type="submit" class="btn btn-success">
                                  <template v-if="categorieMutation.isPending.value">
                                   <i class="fas fa-spinner fa-spin me-2"></i>
                                  Proses...
                                  </template>
                                  <template v-else>Tambah</template>
                                  </button>
                                </div>
                              </div>
                            </div>
                        </form>
                      </div>
                      <div v-if="isLoading" class="mt-4">
                        <TableLoading v-if="isLoading" :rows="6" :columns="5" />
                      </div>
                      <div v-else-if="error" class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Error!</h4>
                        <p>{{ error.message || 'Failed to load categories' }}</p>
                      </div>
                      <div v-else-if="data && Array.isArray(data) && data.length > 0">
                        <table id="basic-datatables" class="display table table-striped table-hover dataTable" role="grid" aria-describedby="basic-datatables_info">
                          <thead>
                            <tr role="row">
                              <th class="sorting_asc" tabindex="0" aria-controls="basic-datatables" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending">
                                Name
                              </th>
                              <th class="sorting" tabindex="0" aria-controls="basic-datatables" rowspan="1" colspan="1" aria-label="Description: activate to sort column ascending">
                                Description
                              </th>
                              <th class="sorting" tabindex="0" aria-controls="basic-datatables" rowspan="1" colspan="1" aria-label="Actions: activate to sort column ascending">
                                Actions
                              </th>
                            </tr>
                          </thead>
                           <tbody>
                            <tr v-for="(category, index) in data" :key="category.id || index" role="row" :class="index % 2 === 0 ? 'even' : 'odd'">
                              <td>{{ category.name }}</td>
                              <td>{{ category.description || '-' }}</td>
                              <td>
                                <button @click="editCategory(category)" class="btn btn-sm btn-primary me-2">
                                  Edit
                                </button>
                                <button @click="deleteCategory(category.id)" class="btn btn-sm btn-danger">
                                  Delete
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div v-else-if="!isLoading && !error" class="text-center py-4">
                        <h5>No Categories Found</h5>
                        <p class="text-muted">No categories available at the moment.</p>
                        <button @click="refetch()" class="btn btn-primary">
                          Refresh
                        </button>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue';
import { ref, onMounted } from 'vue';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useAuthStore } from '@/store/auth';
import customAPI from '@/utils/api';
import { useRoute, useRouter } from 'vue-router';
import TableLoading from '@/components/TableLoading.vue';

// Type definitions
interface Category {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

declare const $: any;
declare const swal: any;


const authStore = useAuthStore()
const router = useRouter()

// mutation
const categorieMutation = useMutation ({
  mutationFn: async() => {
    await customAPI.post(
      '/categories',
      {
        name: nameCategorie.value,
        description: description.value
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );
  },
  onSuccess: () => {
    // Show success alert
    swal({
      title: "Berhasil!",
      text: "Kategori berhasil ditambahkan",
      icon: "success",
      buttons: {
        confirm: {
          text: "OK",
          value: true,
          visible: true,
          className: "btn btn-success",
          closeModal: true
        }
      }
    }).then(() => {
      // Clear form inputs
      nameCategorie.value = "";
      description.value = "";
      
      // Refresh the data
      refetch();
    });
  },
  onError: (err) => {
    console.log(err);
    
  }
});

// fetch categories
const fetchCategories = async () => {
  const {data} = await customAPI.get("/categories", {
    headers: {
      Authorization: `Bearer ${authStore.token}`
    },
  });

  return data.data;
};

const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["categories"],
  queryFn: fetchCategories,
});

// Action methods
const editCategory = (category: Category): void => {
  console.log('Edit category:', category)
  // Implementasi logic edit di sini
}

const deleteCategory = (categoryId: number): void => {
  if (confirm('Are you sure you want to delete this category?')) {
    console.log('Delete category:', categoryId)
    // Implementasi logic delete di sini
  }
}


// props
const prop = defineProps({
  isUpdate: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
  },
});

// state
const nameCategorie = ref("")
const description = ref("")

// initialize DataTables
onMounted(() => {
  if (typeof $ !== 'undefined' && $.fn.DataTable) {
    $('#basic-datatables').DataTable();
  }
});

// event
const handleSubmit = () => {
  categorieMutation.mutate();

};
</script>
