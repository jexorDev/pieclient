<script setup lang="ts">
import Category from '@/data/interfaces/Category';
import Question from '@/data/interfaces/Question';
import { computed, defineEmits } from 'vue';

const props = defineProps<{
    questions: Question[],
    categories: Category[]
}>();

const emit = defineEmits<{
    addQuestion: [text: string, categoryId: number]
    addEntry: [id: number]
}>();

let selectedQuestionIdBacking: number | null = null;
const selectedQuestionId = computed<number | null>({
    get() {
        return selectedQuestionIdBacking;
    },
    set(newVal) {
        if (newVal) {
            emit('addEntry', newVal);
        }
        
        selectedQuestionIdBacking = null;
    }
});

//const customQuestionText = ref("");
//const selectedCategory = ref<Category | null>(null);

// function submitNewQuestion(): void {
//     if (!selectedCategory.value) return;
//     emit("addQuestion", [customQuestionText.value, selectedCategory.value.id])
// }

</script>
<template>
    <v-autocomplete :items="props.questions" v-model="selectedQuestionId" item-title="text" item-value="id" clearable variant="outlined">
        <!-- <template v-slot:append-item>
            <v-combobox :items="props.categories" v-model="selectedCategory"></v-combobox>
            <v-text-field label="Custom" variant="outlined" v-model="customQuestionText">
                  <template v-slot:append-inner>
      <v-btn color="success" prepend-icon="mdi-plus" @click="submitNewQuestion">Add</v-btn>
    </template>
                </v-text-field>
        </template> -->
    </v-autocomplete>
</template>