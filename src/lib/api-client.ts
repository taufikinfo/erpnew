const API_BASE_URL = 'http://localhost:8000/api/v1';

class ApiClient {
  private baseURL: string;
  private token: string | null;

  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('access_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || 'Request failed');
    }

    return response.json();
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request<{ access_token: string; token_type: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.token = response.access_token;
    localStorage.setItem('access_token', response.access_token);
    return response;
  }

  async register(email: string, password: string) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('access_token');
  }

  // Dashboard
  async getDashboardStats() {
    return this.request('/dashboard/stats');
  }

  // Customers
  async getCustomers(skip = 0, limit = 100) {
    return this.request(`/customers/?skip=${skip}&limit=${limit}`);
  }

  async getCustomer(id: string) {
    return this.request(`/customers/${id}`);
  }

  async createCustomer(data: any) {
    return this.request('/customers/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCustomer(id: string, data: any) {
    return this.request(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCustomer(id: string) {
    return this.request(`/customers/${id}`, {
      method: 'DELETE',
    });
  }

  // Employees
  async getEmployees(skip = 0, limit = 100) {
    return this.request(`/employees/?skip=${skip}&limit=${limit}`);
  }

  async getEmployee(id: string) {
    return this.request(`/employees/${id}`);
  }

  async createEmployee(data: any) {
    return this.request('/employees/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateEmployee(id: string, data: any) {
    return this.request(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteEmployee(id: string) {
    return this.request(`/employees/${id}`, {
      method: 'DELETE',
    });
  }

  // Inventory
  async getInventoryItems(skip = 0, limit = 100) {
    return this.request(`/inventory/?skip=${skip}&limit=${limit}`);
  }

  async getInventoryItem(id: string) {
    return this.request(`/inventory/${id}`);
  }

  async createInventoryItem(data: any) {
    return this.request('/inventory/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInventoryItem(id: string, data: any) {
    return this.request(`/inventory/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteInventoryItem(id: string) {
    return this.request(`/inventory/${id}`, {
      method: 'DELETE',
    });
  }

  // Sales Leads
  async getSalesLeads(skip = 0, limit = 100) {
    return this.request(`/sales/?skip=${skip}&limit=${limit}`);
  }

  async getSalesLead(id: string) {
    return this.request(`/sales/${id}`);
  }

  async createSalesLead(data: any) {
    return this.request('/sales/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSalesLead(id: string, data: any) {
    return this.request(`/sales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSalesLead(id: string) {
    return this.request(`/sales/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects
  async getProjects(skip = 0, limit = 100) {
    return this.request(`/projects/?skip=${skip}&limit=${limit}`);
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`);
  }

  async createProject(data: any) {
    return this.request('/projects/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: any) {
    return this.request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Docs methods
  async getDocs(publishedOnly: boolean = true, category?: string) {
    const params: Record<string, string> = { published_only: publishedOnly.toString() };
    if (category) {
      params.category = category;
    }
    const queryString = '?' + new URLSearchParams(params).toString();
    return this.request(`/docs/${queryString}`);
  }

  async getDocBySlug(slug: string) {
    return this.request(`/docs/${slug}`);
  }

  async createDoc(data: any) {
    return this.request('/docs/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDoc(id: string, data: any) {
    return this.request(`/docs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDoc(id: string) {
    return this.request(`/docs/${id}`, {
      method: 'DELETE',
    });
  }

  async getDocCategories() {
    return this.request('/docs/categories/');
  }

  // Blog methods
  async getBlogs(publishedOnly: boolean = true, category?: string) {
    const params: Record<string, string> = { published_only: publishedOnly.toString() };
    if (category) {
      params.category = category;
    }
    const queryString = '?' + new URLSearchParams(params).toString();
    return this.request(`/blogs/${queryString}`);
  }

  async getBlogBySlug(slug: string) {
    return this.request(`/blogs/${slug}`);
  }

  async createBlog(data: any) {
    return this.request('/blogs/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlog(id: string, data: any) {
    return this.request(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteBlog(id: string) {
    return this.request(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  async getBlogCategories() {
    return this.request('/blogs/categories/');
  }

  // FAQ methods
  async getFAQs(publishedOnly: boolean = true, category?: string) {
    const params: Record<string, string> = { published_only: publishedOnly.toString() };
    if (category) {
      params.category = category;
    }
    const queryString = '?' + new URLSearchParams(params).toString();
    return this.request(`/faqs/${queryString}`);
  }

  async getFAQ(id: string) {
    return this.request(`/faqs/${id}`);
  }

  async createFAQ(data: any) {
    return this.request('/faqs/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFAQ(id: string, data: any) {
    return this.request(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFAQ(id: string) {
    return this.request(`/faqs/${id}`, {
      method: 'DELETE',
    });
  }

  async getFAQCategories() {
    return this.request('/faqs/categories/');
  }
  // Finance - Transactions
  async getTransactions(skip = 0, limit = 100) {
    return this.request(`/finance/transactions/?skip=${skip}&limit=${limit}`);
  }

  async getTransaction(id: string) {
    return this.request(`/finance/transactions/${id}`);
  }

  async createTransaction(data: any) {
    return this.request('/finance/transactions/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateTransaction(id: string, data: any) {
    return this.request(`/finance/transactions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteTransaction(id: string) {
    return this.request(`/finance/transactions/${id}`, {
      method: 'DELETE',
    });
  }

  // Finance - Invoices
  async getInvoices(skip = 0, limit = 100) {
    return this.request(`/finance/invoices/?skip=${skip}&limit=${limit}`);
  }

  async getInvoice(id: string) {
    return this.request(`/finance/invoices/${id}`);
  }

  async createInvoice(data: any) {
    return this.request('/finance/invoices/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateInvoice(id: string, data: any) {
    return this.request(`/finance/invoices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteInvoice(id: string) {
    return this.request(`/finance/invoices/${id}`, {
      method: 'DELETE',
    });
  }

  // Finance - Expenses
  async getExpenses(skip = 0, limit = 100) {
    return this.request(`/finance/expenses/?skip=${skip}&limit=${limit}`);
  }

  async getExpense(id: string) {
    return this.request(`/finance/expenses/${id}`);
  }

  async createExpense(data: any) {
    return this.request('/finance/expenses/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateExpense(id: string, data: any) {
    return this.request(`/finance/expenses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteExpense(id: string) {
    return this.request(`/finance/expenses/${id}`, {
      method: 'DELETE',
    });
  }

  // Manufacturing - Work Orders
  async getWorkOrders(skip = 0, limit = 100) {
    return this.request(`/manufacturing/work-orders/?skip=${skip}&limit=${limit}`);
  }

  async getWorkOrder(id: string) {
    return this.request(`/manufacturing/work-orders/${id}`);
  }

  async createWorkOrder(data: any) {
    return this.request('/manufacturing/work-orders/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateWorkOrder(id: string, data: any) {
    return this.request(`/manufacturing/work-orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteWorkOrder(id: string) {
    return this.request(`/manufacturing/work-orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Vendors/Suppliers
  async getVendors(skip = 0, limit = 100) {
    return this.request(`/vendors/?skip=${skip}&limit=${limit}`);
  }

  async getVendor(id: string) {
    return this.request(`/vendors/${id}`);
  }

  async createVendor(data: any) {
    return this.request('/vendors/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateVendor(id: string, data: any) {
    return this.request(`/vendors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteVendor(id: string) {
    return this.request(`/vendors/${id}`, {
      method: 'DELETE',
    });
  }

  // Purchase Orders
  async getPurchaseOrders(skip = 0, limit = 100) {
    return this.request(`/purchase-orders/?skip=${skip}&limit=${limit}`);
  }

  async getPurchaseOrder(id: string) {
    return this.request(`/purchase-orders/${id}`);
  }

  async createPurchaseOrder(data: any) {
    return this.request('/purchase-orders/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePurchaseOrder(id: string, data: any) {
    return this.request(`/purchase-orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePurchaseOrder(id: string) {
    return this.request(`/purchase-orders/${id}`, {
      method: 'DELETE',
    });
  }

  // User Management methods
  async getUsers(skip = 0, limit = 100) {
    return this.request(`/users/?skip=${skip}&limit=${limit}`);
  }

  async getUser(id: string) {
    return this.request(`/users/${id}`);
  }

  async updateUserStatus(id: string, status: string) {
    return this.request(`/users/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async updateUserProfile(id: string, profileData: any) {
    return this.request(`/users/${id}/profile`, {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async resetUserPassword(id: string, newPassword: string) {
    return this.request(`/users/${id}/reset-password`, {
      method: 'POST',
      body: JSON.stringify({ new_password: newPassword }),
    });
  }

  async unlockUserAccount(id: string) {
    return this.request(`/users/${id}/unlock-account`, {
      method: 'POST',
    });
  }

  async deleteUser(id: string) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Profile management methods
  async getCurrentProfile() {
    return this.request('/profile/');
  }

  async updateCurrentProfile(profileData: any) {
    return this.request('/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getNotificationPreferences() {
    return this.request('/profile/notifications');
  }

  async updateNotificationPreferences(preferences: any) {
    return this.request('/profile/notifications', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    });
  }

  // System Settings methods
  async getSystemSettings() {
    return this.request('/system-settings/');
  }

  async updateSystemSettings(settings: Record<string, boolean>) {
    return this.request('/system-settings/', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Chat methods
  async getChatMessages(skip = 0, limit = 100) {
    return this.request(`/chat/messages?skip=${skip}&limit=${limit}`);
  }

  async sendChatMessage(content: string) {
    return this.request('/chat/messages', {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  async getTypingIndicators() {
    return this.request('/chat/typing-indicators');
  }

  async updateTypingIndicator(isTyping: boolean) {
    return this.request('/chat/typing-indicators', {
      method: 'POST',
      body: JSON.stringify({ is_typing: isTyping }),
    });
  }

  // Generic CRUD methods for other entities
  async get(endpoint: string, params?: Record<string, any>) {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request(`${endpoint}${queryString}`);
  }

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
