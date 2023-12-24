<template>
    <div>
        <div class="tw-mb-4 tw-flex tw-justify-between tw-items-center tw-text-sm">
            <slot name="actions">
                <div class="tw-flex tw-items-center">
                    <a
                        v-if="selectedItems.length < optionsList.length"
                        @click.prevent="handleBulkSelection(optionsList)"
                        href
                        >Select All</a
                    >
                    <span
                        v-if="
                            selectedItems.length < optionsList.length &&
                            selectedItems.length
                        "
                        class="tw-mx-2"
                        >|</span
                    >
                    <a
                        v-if="selectedItems.length"
                        @click.prevent="handleBulkSelection([])"
                        href
                        >Clear</a
                    >
                </div>

                <VueOptionsListSearch v-model="searchKeyword" class="tw-ml-auto" />
            </slot>
        </div>

        <div
            @scroll="handleListScroll"
            ref="listScroller"
            class="tw-max-h-[70vh] tw-overflow-y-auto"
        >
            <div
                v-if="optionsList.length"
                :style="{ minHeight: `${checklistHeight}px` }"
                class="tw-relative"
            >
                <div class="tw-sticky tw-top-0">
                    <slot name="top" />

                    <vue-options-list-item
                        v-for="(listItem, listIndex) in paginatedList"
                        v-model="selectedItems"
                        :key="`item-${listIndex}`"
                        :type="inputType"
                        :native-value="listItem.value || listItem"
                        class="tw-mb-1"
                    >
                        <slot name="item-label" :item="listItem">
                            {{ listItem.label || listItem }}
                        </slot>
                    </vue-options-list-item>
                </div>
            </div>
            <p v-else class="tw-mb-0 tw-text-sm">No items found.</p>
        </div>
    </div>
</template>

<script>
import "./../assets/css/main.css";

import Fuse from "fuse.js";
import VueOptionsListItem from "./VueOptionsListItem.vue";
import VueOptionsListSearch from "./VueOptionsListSearch.vue";

export default {
    components: {
        VueOptionsListItem,
        VueOptionsListSearch,
    },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        options: Array,
        inputType: {
            type: String,
            default: "checkbox",
        },
    },
    data() {
        return {
            searchKeyword: null,
            listScrollHeight: 0,
            listScrollMax: 0,
            listScrollTop: 0,
        };
    },
    computed: {
        selectedItems: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
        optionsList() {
            let options = this.options;
            const fuse = new Fuse(options, {
                useExtendedSearch: true,
                keys: "object" === typeof options[0] ? ["label"] : [],
            });

            if (this.searchKeyword)
                options = fuse.search(`'${this.searchKeyword}`).map((item) => item.item);

            return options.filter((item) => {
                return "All" == item ? false : true;
            });
        },
        paginatedList() {
            //When the combined list height is less than the scroll, then just return the whole list.
            //This is mostly a simple workaround to prevent the optionList watcher to recalculating the scroll height from 
            //an incomplete page. 
            if (this.checklistHeight <= Math.floor(this.listScrollHeight)) {
                return this.optionsList;
            }
            const startIndex = Math.floor(this.listScrollTop / 25);
            const endIndex = startIndex + Math.floor(this.listScrollHeight / 25);

            return this.optionsList.filter((optionItem, optionIndex) => {
                return optionIndex >= startIndex && optionIndex <= endIndex;
            });
        },
        checklistHeight() {
            return this.optionsList.length * 25;
        },
    },
    methods: {
        handleBulkSelection(items) {
            this.selectedItems = items;
        },
        handleListScroll(evt) {
            this.listScrollTop = evt.target.scrollTop;
        },
    },
    watch: {
        optionsList: {
            immediate: true,
            handler(newValue) {
                if (newValue.length) {
                    this.$nextTick(() => {
                        setTimeout(() => {
                            this.listScrollHeight = this.$refs.listScroller.offsetHeight;
                            this.listScrollMax =
                                this.checklistHeight - this.listScrollHeight;
                        }, 100);
                    });
                } else {
                    this.listScrollHeight = 0;
                    this.listScrollMax = 0;
                    this.listScrollTop = 0;
                }
            },
        },
    },
};
</script>
