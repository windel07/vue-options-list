<template>
    <div class="tw-rounded-[30px] tw-flex tw-flex-wrap tw-overflow-hidden tw-shadow-md">
        <span class="tw-text-[#adb5bd] tw-p-2 tw-flex tw-items-center tw-justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="tw-w-[16px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </span>
        <input
            v-model="innerValue"
            type="text"
            class="tw-py-2 tw-pr-3 focus-visible:tw-outline-none"
            placeholder="Search"
        />
    </div>
</template>

<script>
import debounce from "lodash.debounce";

export default {
    props: ["value"],
    computed: {
        innerValue: {
            get() {
                return this.value;
            },
            set: debounce(function (value) {
                this.$emit("input", value);
            }, 500),
        },
    },
};
</script>
