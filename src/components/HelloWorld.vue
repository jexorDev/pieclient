<script setup lang="ts">
  import EnteredInquiryCard from './EnteredInquiryCard.vue';
  import QuestionSearchBar from "./QuestionSearchBar.vue";
  import StatsDialog from './StatsDialog.vue';
  import {createCategory, getCategories} from "../data/repositories/Categories";
  import {createEntry, getEntries, updateEntry, deleteEntry} from "../data/repositories/Entries";
  import {onMounted, ref, computed} from "vue";
import Category from '@/data/interfaces/Category';
import Question from '@/data/interfaces/Question';
import StatisticQuestionCount from "@/data/interfaces/StatisticQuestionCount";
import { createQuestion, getQuestions } from '@/data/repositories/Questions';
import Entry from '@/data/interfaces/Entry';
import { getQuestionCount } from '@/data/repositories/Statistics';

  onMounted(async () => {
    await fetchData();
  });



  const categories = ref<Category[]>([]);
  const questions = ref<Question[]>([]);
  const entries = ref<Entry[]>([]);
  const selectedCategoryId = ref<number | null>(null);
  const selectedLocationId = ref<number>(0);
  const customQuestionText = ref<string>("");
  const customCategoryText = ref<string>("");
  const selectedEntryToEdit = ref<Entry | undefined>(undefined);
  const selectedEntryToEditLocation = ref<number>(0);
  const showStatsDialog = ref(false);

  const statisticsQuestionCount = ref<StatisticQuestionCount[]>([]);

  const selectedCategory = computed<Category | undefined>(() =>
    categories.value.find(category => category.id === selectedCategoryId.value)
  )

  const categoryQuestions = computed<Question[] | undefined>(() => questions.value.filter(question => question.categoryId === selectedCategoryId.value));

  const entriesSorted = computed<Entry[]>(() => entries.value.sort((a, b) => Date.parse(b.timestamp.toString()) - Date.parse(a.timestamp.toString())))

  const showEditDialog = computed<boolean>(() => selectedEntryToEdit.value !== undefined);

  async function fetchData() {
    Promise.all([
      categories.value = await getCategories(),
      questions.value = await getQuestions(),
      entries.value = await getEntries(),
      statisticsQuestionCount.value = await getQuestionCount()
    ])
  }

  async function submitEntry(questionId: number) {
    await createEntry(questionId, selectedLocationId.value);
    await fetchData();
    selectedCategoryId.value = null;
  }

  async function modifyEntry() {
    if (!selectedEntryToEdit.value) return;
    selectedEntryToEdit.value.locationId = selectedEntryToEditLocation.value;
    await updateEntry(selectedEntryToEdit.value.id, selectedEntryToEditLocation.value);

    selectedEntryToEdit.value = undefined;
    
  }

  function editEntry(id: number) {
    selectedEntryToEdit.value = entries.value.find(x => x.id === id);
    if (selectedEntryToEdit.value !== undefined) {
      selectedEntryToEditLocation.value = selectedEntryToEdit.value.locationId;
    }
  }

  async function removeEntry() {
    if (selectedEntryToEdit.value === undefined) return;
    
    await deleteEntry(selectedEntryToEdit.value.id);
    await fetchData();

    selectedEntryToEdit.value = undefined;
  }

  async function submitQuestion(questionText: string) {
    
    const question = await createQuestion(questionText, selectedCategoryId.value ?? 0);
    await createEntry(question.id, selectedLocationId.value);
    await fetchData();
    customQuestionText.value = "";
    selectedCategoryId.value = null;
  }

  async function submitCategory(categoryName: string) {
    const category = await createCategory(categoryName);
    categories.value.push(category);
    customCategoryText.value = "";
  }

  function showStats() {
    showStatsDialog.value = true;
  }

</script>
<template>
  <v-container>
    <v-responsive
      class="align-centerfill-height mx-auto"
      
    >
    <v-dialog v-model="showEditDialog">
      <v-card max-width="500">
        <v-card-text>
          <div>{{ selectedEntryToEdit?.categoryName }}</div>
          <div>{{ selectedEntryToEdit?.questionText }}</div>
          <v-btn-toggle v-model="selectedEntryToEditLocation" mandatory color="primary" divided>
        <v-btn prepend-icon="mdi-phone">Phone</v-btn>
        <v-btn prepend-icon="mdi-information-variant">Main Desk</v-btn>
        <v-btn prepend-icon="mdi-satellite-uplink">Satellite Desk</v-btn>
      </v-btn-toggle>

        </v-card-text>
        <v-card-actions>
          <v-btn @click="removeEntry">Delete</v-btn>
          <v-btn color="primary" @click="selectedEntryToEdit = undefined">Cancel</v-btn>
          <v-btn color="primary" @click="modifyEntry">Save</v-btn>
        </v-card-actions>
        
      </v-card>

    </v-dialog>
    <v-navigation-drawer>
      <v-card>
        <v-card-title>Total Inquiries</v-card-title>
        <v-card-text><div class="text-h2">{{ entries.length }}</div></v-card-text>
      </v-card>
      <v-card>
        <v-card-text>Recent Inquiries</v-card-text>
      </v-card>
  <EnteredInquiryCard v-for="entry in entriesSorted" :entry="entry" @editEntry="editEntry" @addEntry="submitEntry"></EnteredInquiryCard>

</v-navigation-drawer>
<v-row>
  <v-col :cols="3">
    <v-btn-toggle v-model="selectedLocationId" mandatory color="primary" divided>
      <v-btn prepend-icon="mdi-phone">Phone</v-btn>
      <v-btn prepend-icon="mdi-information-variant">Main Desk</v-btn>
      <v-btn prepend-icon="mdi-satellite-uplink">Satellite Desk</v-btn>
    </v-btn-toggle>
  </v-col>
  <v-col :cols="7">
    <QuestionSearchBar :questions="questions" :categories="categories" @addEntry="submitEntry"></QuestionSearchBar>
  </v-col>
  <v-col :cols="2">
    <v-btn prepend-icon="mdi-sort">Sort Categories</v-btn>
    <v-btn @click="showStats">Stats</v-btn>
  </v-col>
</v-row>
  
  
<v-container fluid v-show="!selectedCategory">
        <v-row dense v-for="category in categories">
            <v-col >
                <v-card :title="category.name" @click="selectedCategoryId = category.id" ></v-card>
            </v-col>     
            </v-row>
            <v-row>
            <v-col>
              <v-text-field label="Custom" variant="outlined" v-model="customCategoryText">
                  <template v-slot:append-inner>
      <v-btn color="success" prepend-icon="mdi-plus" @click="submitCategory(customCategoryText)">Add</v-btn>
    </template>
                </v-text-field>
            </v-col>       
        </v-row>
    </v-container>



  <div v-show="selectedCategory">    
    <v-btn @click="selectedCategoryId = null" prepend-icon="mdi-chevron-left" variant="text">Back</v-btn>
    <v-container fluid >
        <v-row dense v-for="question in categoryQuestions">
            <v-col >
                <v-card :title="question.text" @click="submitEntry(question.id)" ></v-card>
            </v-col>            
        </v-row>
        <v-row dense>
          <v-col>
            <v-card>
              <v-card-text>

                <v-text-field label="Custom" variant="outlined" v-model="customQuestionText">
                  <template v-slot:append-inner>
      <v-btn color="success" prepend-icon="mdi-plus" @click="submitQuestion(customQuestionText)">Add</v-btn>
    </template>
                </v-text-field>
              </v-card-text>

            </v-card>
          </v-col>
        </v-row>
    </v-container>
  </div>

  <v-navigation-drawer location="right">
    <v-card>
        <v-card-text>
            Popular inquiries
        </v-card-text>
    </v-card>
      <StatQuestionCountCard v-for="stat in statisticsQuestionCount" :stat="stat" @addEntry="submitEntry"></StatQuestionCountCard>
  
</v-navigation-drawer>
    


    </v-responsive>
  </v-container>
  <StatsDialog :show="showStatsDialog" @close="showStatsDialog = false"></StatsDialog>
  
</template>
