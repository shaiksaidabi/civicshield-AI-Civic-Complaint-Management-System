const API_BASE_URL = "http://localhost:8080/api";
export async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    const text = await response.text();

    let data;

    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = {
            success: false,
            message: text || "Unexpected server response",
        };
    }

    if (!response.ok) {
        throw new Error(
            data.message || `Request failed with status ${response.status}`
        );
    }

    return data;
}

export async function login(username, password) {
    return apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        }),
    });
}

export async function register(username, password, role = "CITIZEN") {
    return apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
            username,
            password,
            role,
        }),
    });
}

export async function getMyComplaints() {
    return apiRequest("/complaints/my");
}

export async function submitComplaint(complaint) {
    return apiRequest("/complaints", {
        method: "POST",
        body: JSON.stringify(complaint),
    });
}

export async function getAllComplaints() {
    return apiRequest("/complaints/all");
}

export async function getDashboardStats() {
    return apiRequest("/complaints/dashboard/stats");
}

export async function getDepartmentStats(department) {
    return apiRequest(`/complaints/dashboard/stats/${department}`);
}

export async function getDepartmentComplaints(department) {
    return apiRequest(`/complaints/department/${department}`);
}

export async function getDepartmentComplaintsByPriority(
    department,
    priority
) {
    return apiRequest(
        `/complaints/department/${department}/priority/${priority}`
    );
}

export async function getDepartmentComplaintsByStatus(
    department,
    status
) {
    return apiRequest(
        `/complaints/department/${department}/status/${status}`
    );
}

export async function updateComplaintStatus(id, status) {
    return apiRequest(`/complaints/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({
            status,
        }),
    });
}

export async function trackComplaint(trackingToken) {
    return apiRequest(`/complaints/${trackingToken}`);
}