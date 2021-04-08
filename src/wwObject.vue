<template>
    <div class="dropdown" ref="dropdownElement" ww-responsive="dropdown" @click.stop>
        <div class="dropdown-default">
            <div class="dropdown-hover-trigger" @click="showDropdown">
                <wwLayout class="dropdown__layout" path="dropdown">
                    <template v-slot="{ item }">
                        <wwLayoutItem>
                            <wwObject v-bind="item" :states="states"></wwObject>
                        </wwLayoutItem>
                    </template>
                </wwLayout>
            </div>

            <div
                v-show="isVisible || isContentEdit"
                class="dropdown__content"
                @mouseenter="isMouseInHandler(true)"
                @mouseleave="isMouseInHandler(false)"
            >
                <transition name="fade" mode="out-in">
                    <wwLayout class="layout" ref="dropdownContent" path="dropdownContent">
                        <template v-slot="{ item }">
                            <wwLayoutItem>
                                <wwObject v-bind="item" :states="states"></wwObject>
                            </wwLayoutItem>
                        </template>
                    </wwLayout>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: Object,
        wwFrontState: Object,
        /* wwEditor:start */
        wwEditorState: Object,
        /* wwEditor:end */
    },
    wwDefaultContent: {
        dropdown: [],
        dropdownContent: [],
        menuBreakpoint: 'mobile',
        contentWidth: '80vw',
        position: 'under',
        trigger: 'mouseenter',
    },
    data() {
        return {
            dropdown: null,
            isVisible: false,
            isMobileVisible: false,
            isContentEdit: false,
            topPosition: 0,
            states: [],
            isMouseIn: false,
        };
    },
    watch: {
        isEditing() {
            if (!this.isEditing) {
                this.isVisible = false;
                this.isContentEdit = false;
            }
        },
    },
    computed: {
        isEditing() {
            /* wwEditor:start */
            return this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION;
            /* wwEditor:end */
            // eslint-disable-next-line no-unreachable
            return false;
        },
    },
    methods: {
        showDropdown() {
            if (this.isVisible) {
                this.isVisible = false;
                this.states = [''];
                return;
            }

            wwLib.$emit('ww-click-dropdown:opened');
            this.isVisible = true;
            this.states = ['active'];
        },
        toggleEdit() {
            this.isContentEdit = !this.isContentEdit;
        },
        updatePosition() {
            this.topPosition = this.dropdown.getBoundingClientRect().top;
        },
        isMouseInHandler(value) {
            this.isMouseIn = value;
        },
    },
    mounted() {
        document.addEventListener('click', () => {
            if (this.isMouseIn) return;
            this.isVisible = false;
        });
        this.dropdown = this.$refs.dropdownElement;
    },
    created() {
        wwLib.$on('ww-click-dropdown:opened', () => {
            this.isVisible = false;
        });
    },
    beforeDestroy() {
        wwLib.$off('ww-click-dropdown:opened');
    },
};
</script>

<style lang="scss" scoped>
.dropdown {
    position: relative;

    &__layout {
        display: flex;
        flex-direction: column;
        min-height: 20px;
        min-width: 100px;
    }

    &__content {
        z-index: 9999;
        position: absolute;
        top: 100%;
        left: 0;

        .layout {
            min-height: 20px;
            min-width: 100px;
        }
    }
}

// FADE
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
