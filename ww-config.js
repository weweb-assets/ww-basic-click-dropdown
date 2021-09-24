export default {
    options: {
        autoByContent: true,
    },
    editor: {
        label: {
            en: 'Click dropdown',
        },
    },
    properties: {
        toggleEdit: {
            type: 'Button',
            editorOnly: true,
            options: {
                text: { en: 'Toggle edition', fr: 'Toggle edition' },
                color: 'blue',
                action: 'toggleEdit',
            },
            section: 'settings',
        },
        dropdown: {
            hidden: true,
            defaultValue: [],
        },
        dropdownContent: {
            hidden: true,
            defaultValue: [],
        },
    },
};
