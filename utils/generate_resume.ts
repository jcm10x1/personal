type ContentGroup = {
    title: string;
    description: string;
    content: string;
};

type ApiResponse = {
    data: ContentGroup[];
};

async function fetchContentGroup(contentGroupId: string): Promise<ApiResponse> {
    const url = new URL("https://getcontent-kf6xfyi63a-uc.a.run.app/");
    url.searchParams.append("websiteId", "e2Wdq5afxqCzvl0lGX3g");
    url.searchParams.append("contentGroupId", contentGroupId);

    const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return response.json();
}

export async function generateContentPdf() {
    // Ensure this code only runs in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.warn("generateContentPdf should only be called in a browser environment.");
        return;
    }

    // Lazy-load html2pdf.js to avoid SSR issues
    const html2pdf = (await import('html2pdf.js')).default;

    // Define content group IDs to fetch
    const contentGroupIds = [
        "pTwrUFDK3BFd3mi9Hr9f", // About
        "VISQ67cdXcB9rh8IQqL6", // Projects
        "ejTrFXNB9ft8wMPGN4cB", // Organizations
    ];

    const contentGroupNames = [
        "About",
        "Projects",
        "Organizations"
    ]

    const allContentGroups = await Promise.all(contentGroupIds.map(fetchContentGroup));

let pdfContent = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: black; margin: 0; padding: 0;">`;

// Main title (Name)
pdfContent += `<h1 style="margin: 0; padding: 0; font-size: 30px; font-weight: bold;">Jacob Miller</h1>`;

// Loop through each content group
allContentGroups.forEach((group, index) => {
    // Section title (Content Group Name) without forced page break
    pdfContent += `<h2 style="margin: 16px 0 8px; font-size: 24px; font-weight: bold;">${contentGroupNames[index]}</h2>`;

    if (index !== 0) {
        // For non-about sections, loop through entries
        group.data.forEach(entry => {
            pdfContent += `
                <div style="margin-bottom: 12px; page-break-inside: avoid;">
                    <h3 style="margin: 4px 0; font-size: 20px; font-weight: bold;">${entry.title}</h3>
                    <p style="margin: 4px 0; font-weight: bold;">${entry.description}</p>
                   ${entry.content}
                </div>
            `;
        });
    } else {
        // For the about section, display only the first entry
        const entry = group.data[0];
        pdfContent += `
            <div style="margin: 8px 0; page-break-inside: avoid;">
                <p style="margin: 4px 0; font-weight: bold;">${entry.description}</p>
                ${entry.content}
            </div>
        `;
    }
});

pdfContent += `</div>`;

    // Generate PDF and open it in a new tab
    const element = document.createElement('div');
    element.innerHTML = pdfContent;
    const options = {
        margin:       1,
        filename:     'JacobMillerResume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(options).outputPdf('blob').then((pdfBlob: Blob) => {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank'); // Open the PDF in a new tab
    });
}