document.addEventListener('DOMContentLoaded', () => {
    // Mock Data for Cases
    const cases = [
        {
            id: 'CS-2023-001',
            client: 'TechCorp Industries',
            type: 'Intellectual Property',
            category: 'Judicial',
            status: 'Active',
            lastUpdate: '2 hours ago',
            attorney: 'Sarah Jenkins'
        },
        {
            id: 'CS-2023-002',
            client: 'Estate of J. Smith',
            type: 'Probate',
            category: 'Extrajudicial',
            status: 'Pending',
            lastUpdate: '1 day ago',
            attorney: 'Michael Ross'
        },
        {
            id: 'CS-2023-003',
            client: 'Global Logistics Inc',
            type: 'Contract Dispute',
            category: 'Judicial',
            status: 'Active',
            lastUpdate: '3 days ago',
            attorney: 'Sarah Jenkins'
        },
        {
            id: 'CS-2023-004',
            client: 'City Development',
            type: 'Real Estate',
            category: 'Extrajudicial',
            status: 'Closed',
            lastUpdate: '1 week ago',
            attorney: 'Jessica Pearson'
        },
        {
            id: 'CS-2023-005',
            client: 'John Doe',
            type: 'Civil Litigation',
            category: 'Judicial',
            status: 'Active',
            lastUpdate: 'Just now',
            attorney: 'Michael Ross'
        }
    ];

    // Mock Data for Clients
    const clients = [
        { name: 'TechCorp Industries', contact: 'Sarah Connor', email: 'sarah@techcorp.com', activeCases: 2, status: 'Active' },
        { name: 'Estate of J. Smith', contact: 'Jane Smith', email: 'jane@smith.com', activeCases: 1, status: 'Active' },
        { name: 'Global Logistics Inc', contact: 'Robert Chen', email: 'r.chen@globallogistics.com', activeCases: 3, status: 'Active' },
        { name: 'City Development', contact: 'Mayor office', email: 'contact@city.gov', activeCases: 0, status: 'Inactive' }
    ];

    // Mock Data for Lawyers
    const lawyers = [
        { name: 'Sarah Jenkins', specialization: 'Corporate Law', email: 's.jenkins@lexmanager.com', phone: '+1 555-0101', activeCases: 12, status: 'Active' },
        { name: 'Michael Ross', specialization: 'Civil Litigation', email: 'm.ross@lexmanager.com', phone: '+1 555-0102', activeCases: 8, status: 'Active' },
        { name: 'Jessica Pearson', specialization: 'Real Estate', email: 'j.pearson@lexmanager.com', phone: '+1 555-0103', activeCases: 5, status: 'On Leave' },
        { name: 'Harvey Specter', specialization: 'Criminal Defense', email: 'h.specter@lexmanager.com', phone: '+1 555-0104', activeCases: 15, status: 'Active' }
    ];

    // Mock Data for Leads
    const leads = [
        { name: 'Alice Wonderland', interest: 'Family Law', contact: 'alice@example.com', status: 'New', dateAdded: '2023-11-20' },
        { name: 'Bob Builder', interest: 'Real Estate', contact: 'bob@construction.com', status: 'Contacted', dateAdded: '2023-11-18' },
        { name: 'Charlie Chocolate', interest: 'Corporate', contact: 'charlie@factory.com', status: 'Qualified', dateAdded: '2023-11-15' },
        { name: 'Dave Diver', interest: 'Criminal', contact: 'dave@ocean.com', status: 'Lost', dateAdded: '2023-11-10' }
    ];

    // Mock Data for Calendar
    const events = [
        { date: '2023-11-25', time: '10:00 AM', event: 'Initial Hearing', caseRef: 'CS-2023-001', location: 'Courtroom 4B' },
        { date: '2023-11-27', time: '02:00 PM', event: 'Client Meeting', caseRef: 'CS-2023-003', location: 'Conference Room A' },
        { date: '2023-11-30', time: '09:00 AM', event: 'Discovery Deadline', caseRef: 'CS-2023-005', location: 'N/A' }
    ];

    // Mock Data for Documents
    const documents = [
        { name: 'Case_Brief_001.pdf', type: 'PDF', size: '2.4 MB', date: '2023-11-20' },
        { name: 'Evidence_Log_v2.xlsx', type: 'Excel', size: '1.1 MB', date: '2023-11-19' },
        { name: 'Contract_Draft_Final.docx', type: 'Word', size: '500 KB', date: '2023-11-18' },
        { name: 'Witness_Statement.pdf', type: 'PDF', size: '1.2 MB', date: '2023-11-15' }
    ];

    // Render Functions
    function renderCases(data, tableId = 'cases-table-body') {
        const tableBody = document.getElementById(tableId);
        if (!tableBody) return;

        tableBody.innerHTML = '';
        data.forEach(caseItem => {
            const row = document.createElement('tr');
            const statusClass = `status-${caseItem.status.toLowerCase()}`;

            row.innerHTML = `
                <td><strong>${caseItem.id}</strong></td>
                <td>${caseItem.client}</td>
                <td>${caseItem.type}</td>
                <td>${caseItem.category || 'N/A'}</td>
                <td><span class="status-badge ${statusClass}">${caseItem.status}</span></td>
                <td>${caseItem.lastUpdate}</td>
                <td>
                <td>
                    <button class="action-btn view-btn" data-id="${caseItem.id}" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="action-btn edit-btn" data-id="${caseItem.id}" title="Edit"><i class="fas fa-edit"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function renderClients() {
        const tbody = document.getElementById('clients-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><strong>${client.name}</strong></td>
                <td>${client.contact}</td>
                <td>${client.email}</td>
                <td>${client.activeCases}</td>
                <td><span class="status-badge status-${client.status.toLowerCase()}">${client.status}</span></td>
                <td><button class="action-btn"><i class="fas fa-ellipsis-h"></i></button></td>
            `;
            tbody.appendChild(row);
        });
    }

    function renderLawyers() {
        const tbody = document.getElementById('lawyers-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        lawyers.forEach(lawyer => {
            const row = document.createElement('tr');
            const statusClass = lawyer.status === 'Active' ? 'status-active' : 'status-closed'; // Simple mapping
            row.innerHTML = `
                <td><strong>${lawyer.name}</strong></td>
                <td>${lawyer.specialization}</td>
                <td>${lawyer.email}</td>
                <td>${lawyer.phone}</td>
                <td>${lawyer.activeCases}</td>
                <td><span class="status-badge ${statusClass}">${lawyer.status}</span></td>
                <td><button class="action-btn"><i class="fas fa-ellipsis-h"></i></button></td>
            `;
            tbody.appendChild(row);
        });
    }

    function renderLeads() {
        const tbody = document.getElementById('leads-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        leads.forEach(lead => {
            const row = document.createElement('tr');
            let statusColor = 'status-closed';
            if (lead.status === 'New') statusColor = 'status-info';
            if (lead.status === 'Contacted') statusColor = 'status-pending';
            if (lead.status === 'Qualified') statusColor = 'status-active';
            if (lead.status === 'Lost') statusColor = 'status-danger';

            row.innerHTML = `
                <td><strong>${lead.name}</strong></td>
                <td>${lead.interest}</td>
                <td>${lead.contact}</td>
                <td><span class="status-badge ${statusColor}">${lead.status}</span></td>
                <td>${lead.dateAdded}</td>
                <td>
                    <button class="action-btn" title="Convert"><i class="fas fa-check"></i></button>
                    <button class="action-btn" title="Archive"><i class="fas fa-archive"></i></button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    function renderCalendar() {
        const tbody = document.getElementById('calendar-table-body');
        if (!tbody) return;
        tbody.innerHTML = '';
        events.forEach(evt => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${evt.date}</td>
                <td>${evt.time}</td>
                <td><strong>${evt.event}</strong></td>
                <td>${evt.caseRef}</td>
                <td>${evt.location}</td>
            `;
            tbody.appendChild(row);
        });
    }

    function renderDocuments() {
        const container = document.getElementById('documents-container');
        if (!container) return;
        container.innerHTML = '';
        // Simple grid style for docs
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
        container.style.gap = '1.5rem';

        documents.forEach(doc => {
            const card = document.createElement('div');
            card.className = 'stat-card'; // Reusing card style
            card.style.flexDirection = 'column';
            card.style.alignItems = 'flex-start';

            let iconClass = 'fa-file';
            let color = '#94a3b8';
            if (doc.type === 'PDF') { iconClass = 'fa-file-pdf'; color = '#ef4444'; }
            if (doc.type === 'Word') { iconClass = 'fa-file-word'; color = '#3b82f6'; }
            if (doc.type === 'Excel') { iconClass = 'fa-file-excel'; color = '#10b981'; }

            card.innerHTML = `
                <div class="stat-icon" style="background-color: ${color}20; color: ${color}; margin-bottom: 1rem;">
                    <i class="fas ${iconClass}"></i>
                </div>
                <div class="stat-info">
                    <h3 style="font-size: 1rem;">${doc.name}</h3>
                    <p>${doc.size} • ${doc.date}</p>
                </div>
                <button class="action-btn" style="margin-top: 1rem; align-self: flex-end;"><i class="fas fa-download"></i></button>
            `;
            container.appendChild(card);
        });
    }

    // Initial Render
    renderCases(cases.slice(0, 5), 'cases-table-body'); // Recent cases for dashboard
    renderCases(cases, 'all-cases-table-body'); // All cases for cases view

    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');

            // Hide all views
            views.forEach(view => view.style.display = 'none');

            // Show target view
            const viewId = link.getAttribute('data-view');
            const targetView = document.getElementById(`view-${viewId}`);
            if (targetView) {
                targetView.style.display = 'block';

                // Render data if needed
                if (viewId === 'cases') renderCases(cases, 'all-cases-table-body');
                if (viewId === 'clients') renderClients();
                if (viewId === 'lawyers') renderLawyers();
                if (viewId === 'leads') renderLeads();
                if (viewId === 'calendar') renderCalendar();
                if (viewId === 'documents') renderDocuments();
            }
        });
    });

    // --- New Modals Logic (Clients, Lawyers, Leads) ---

    // Generic Modal Handler
    function setupModal(modalId, btnId, formId, submitHandler) {
        const modal = document.getElementById(modalId);
        const btn = document.getElementById(btnId);
        const form = document.getElementById(formId);

        if (!modal || !btn || !form) return;

        // Open
        btn.addEventListener('click', () => modal.classList.add('show'));

        // Close (X button and Cancel button)
        const closeBtns = modal.querySelectorAll('.close-btn, .close-modal-btn');
        closeBtns.forEach(b => b.addEventListener('click', () => modal.classList.remove('show')));

        // Close on click outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('show');
        });

        // Submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitHandler();
            form.reset();
            modal.classList.remove('show');
            // Show success message (mock)
            alert('Item added successfully!');
        });
    }

    // Add Client Logic
    setupModal('add-client-modal', 'add-client-btn', 'new-client-form', () => {
        const name = document.getElementById('client-name-input').value;
        const contact = document.getElementById('client-contact').value;
        const email = document.getElementById('client-email').value;

        clients.push({
            name: name,
            contact: contact,
            email: email,
            activeCases: 0,
            status: 'Active'
        });
        renderClients();
    });

    // Add Lawyer Logic
    setupModal('add-lawyer-modal', 'add-lawyer-btn', 'new-lawyer-form', () => {
        const name = document.getElementById('lawyer-name').value;
        const spec = document.getElementById('lawyer-specialization').value;
        const email = document.getElementById('lawyer-email').value;
        const phone = document.getElementById('lawyer-phone').value;

        lawyers.push({
            name: name,
            specialization: spec,
            email: email,
            phone: phone,
            activeCases: 0,
            status: 'Active'
        });
        renderLawyers();
    });

    // Add Lead Logic
    setupModal('add-lead-modal', 'add-lead-btn', 'new-lead-form', () => {
        const name = document.getElementById('lead-name').value;
        const interest = document.getElementById('lead-interest').value;
        const contact = document.getElementById('lead-contact').value;

        leads.push({
            name: name,
            interest: interest,
            contact: contact,
            status: 'New',
            dateAdded: new Date().toISOString().split('T')[0]
        });
        renderLeads();
    });



    // Modal Logic
    const modal = document.getElementById('add-case-modal');
    const addCaseBtn = document.getElementById('add-case-btn');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.btn-secondary');
    const caseForm = document.getElementById('new-case-form');

    function openModal() {
        modal.classList.add('show');
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    if (addCaseBtn) addCaseBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle Form Submission (Mock)
    if (caseForm) {
        caseForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const clientName = document.getElementById('client-name').value;
            const caseType = document.getElementById('case-type').value;
            const caseCategory = document.getElementById('case-category').value;

            // Create new mock case
            const newCase = {
                id: `CS-2023-00${cases.length + 1}`,
                client: clientName,
                type: caseType,
                category: caseCategory,
                status: 'Active',
                lastUpdate: 'Just now',
                attorney: 'Current User'
            };

            // Add to top of list
            cases.unshift(newCase);

            // Re-render relevant tables
            renderCases(cases.slice(0, 5), 'cases-table-body');
            renderCases(cases, 'all-cases-table-body');

            // Reset and close
            caseForm.reset();
            closeModal();

            // Show simple alert (in real app, use a toast)
            alert('New case added successfully!');
        });
    }

    // Search Functionality
    const searchInput = document.getElementById('search-cases');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCases = cases.filter(item =>
                item.client.toLowerCase().includes(searchTerm) ||
                item.id.toLowerCase().includes(searchTerm) ||
                item.type.toLowerCase().includes(searchTerm)
            );
            renderCases(filteredCases, 'cases-table-body');
        });
    }
    // View Case Details Logic
    const viewModal = document.getElementById('view-case-modal');
    const closeViewBtn = document.querySelector('.close-btn-details');
    const closeViewBtnSecondary = document.getElementById('close-view-btn');
    const viewBody = document.getElementById('view-case-body');

    function openViewModal(caseId) {
        const caseItem = cases.find(c => c.id === caseId);
        if (!caseItem) return;

        viewBody.innerHTML = `
            <div class="form-group">
                <label>Case ID:</label>
                <p><strong>${caseItem.id}</strong></p>
            </div>
            <div class="form-group">
                <label>Client:</label>
                <p>${caseItem.client}</p>
            </div>
            <div class="form-group">
                <label>Type:</label>
                <p>${caseItem.type}</p>
            </div>
            <div class="form-group">
                <label>Category:</label>
                <p>${caseItem.category}</p>
            </div>
            <div class="form-group">
                <label>Status:</label>
                <p><span class="status-badge status-${caseItem.status.toLowerCase()}">${caseItem.status}</span></p>
            </div>
            <div class="form-group">
                <label>Attorney:</label>
                <p>${caseItem.attorney}</p>
            </div>
            <div class="form-group">
                <label>Last Update:</label>
                <p>${caseItem.lastUpdate}</p>
            </div>
        `;
        viewModal.classList.add('show');
    }

    function closeViewModal() {
        viewModal.classList.remove('show');
    }

    if (closeViewBtn) closeViewBtn.addEventListener('click', closeViewModal);
    if (closeViewBtnSecondary) closeViewBtnSecondary.addEventListener('click', closeViewModal);

    // Close on click outside for details modal
    window.addEventListener('click', (e) => {
        if (e.target === viewModal) closeViewModal();
    });

    // Event Delegation for Tables (to handle dynamic buttons)
    document.body.addEventListener('click', (e) => {
        // Handle View Button
        const viewBtn = e.target.closest('.view-btn');
        if (viewBtn) {
            const caseId = viewBtn.getAttribute('data-id');
            openViewModal(caseId);
        }

        // Handle Edit Button (Placeholder)
        const editBtn = e.target.closest('.edit-btn');
        if (editBtn) {
            const caseId = editBtn.getAttribute('data-id');
            alert(`Edit feature for ${caseId} coming soon!`);
        }
    });

    124
});
