import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "expensify/expensify",
    },
    {
      type: "category",
      label: "Auth",
      items: [
        {
          type: "doc",
          id: "expensify/auth-controller-sign-in",
          label: "Sign in a user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "expensify/auth-controller-sign-up",
          label: "Sign up a new user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "expensify/auth-controller-get-me",
          label: "Get current user",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Users",
      items: [
        {
          type: "doc",
          id: "expensify/users-controller-update-user",
          label: "Updates user",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "expensify/users-controller-delete-user",
          label: "Delete user account and all associated data",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "expensify/users-controller-get-current-balance",
          label: "Get current balance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/users-controller-get-monthly-balance",
          label: "Get monthly balance",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/users-controller-get-financial-summary",
          label: "Get financial summary",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/users-controller-get-top-tags",
          label: "Get top tags",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/users-controller-get-balance-history",
          label: "Get balance history",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Expenses",
      items: [
        {
          type: "doc",
          id: "expensify/expenses-controller-create",
          label: "Create expense",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "expensify/expenses-controller-find-all",
          label: "Get all expenses",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/expenses-controller-find-one",
          label: "Get expense by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/expenses-controller-update",
          label: "Update expense",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "expensify/expenses-controller-remove",
          label: "Delete expense",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "expensify/expenses-controller-get-total-spent",
          label: "Get total spent",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/expenses-controller-get-tag-stats",
          label: "Get tag statistics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/expenses-controller-get-monthly-stats",
          label: "Get monthly statistics",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Inflows",
      items: [
        {
          type: "doc",
          id: "expensify/inflows-controller-create",
          label: "Create inflow",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "expensify/inflows-controller-find-all",
          label: "Get all inflows",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/inflows-controller-find-one",
          label: "Get inflow by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/inflows-controller-update",
          label: "Update inflow",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "expensify/inflows-controller-remove",
          label: "Delete inflow",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "expensify/inflows-controller-get-total-inflow",
          label: "Get total inflow",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/inflows-controller-get-tag-stats",
          label: "Get tag statistics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/inflows-controller-get-monthly-stats",
          label: "Get monthly statistics",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Analytics",
      items: [
        {
          type: "doc",
          id: "expensify/analytics-controller-get-consent",
          label: "Get user consent settings",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "expensify/analytics-controller-update-consent",
          label: "Update consent settings",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "expensify/analytics-controller-track-activity",
          label: "Track user activity",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
