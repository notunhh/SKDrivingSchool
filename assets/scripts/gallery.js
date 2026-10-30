document.addEventListener('DOMContentLoaded', function () {
    // Lightbox modal elements
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal'));
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');

    // Attach click events for zooming on gallery items
    function attachZoomListeners() {
        const zoomBtns = document.querySelectorAll('.zoom-btn');
        zoomBtns.forEach(btn => {
            btn.removeEventListener('click', handleZoomClick);
            btn.addEventListener('click', handleZoomClick);
        });
    }

    function handleZoomClick(e) {
        e.stopPropagation();
        const imgSrc = this.getAttribute('data-img');
        const caption = this.getAttribute('data-caption');
        
        modalImage.src = imgSrc;
        modalCaption.textContent = caption;
        imageModal.show();
    }

    attachZoomListeners();

    // Dynamic "Load More" functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    const galleryContainer = document.getElementById('gallery-container');
    const btnSpinner = document.getElementById('btn-spinner');

    let loadedCount = 6;
    const itemsPerLoad = 3;
    const maxItems = 15;

    loadMoreBtn.addEventListener('click', function () {
        // Show spinner
        btnSpinner.classList.remove('d-none');
        loadMoreBtn.disabled = true;

        // Simulate network delay for fetching images
        setTimeout(() => {
            for (let i = 1; i <= itemsPerLoad; i++) {
                loadedCount++;
                if (loadedCount > maxItems) break;

                const col = document.createElement('div');
                col.className = 'col-12 col-sm-6 col-md-4 gallery-item';
                col.innerHTML = `
                    <div class="gallery-card">
                        <img src="https://picsum.photos/600/400?random=${loadedCount}" alt="SK Driving School Session" class="img-fluid">
                        <div class="gallery-overlay">
                            <div class="gallery-info">
                                <h5>Driving Session #${loadedCount}</h5>
                                <span class="badge bg-primary">Practical</span>
                            </div>
                            <button class="btn btn-light btn-sm rounded-circle zoom-btn" data-img="https://picsum.photos/1200/800?random=${loadedCount}" data-caption="Driving Session #${loadedCount}">
                                <i class="fa-solid fa-magnifying-glass-plus"></i>
                            </button>
                        </div>
                    </div>
                `;
                galleryContainer.appendChild(col);
            }

            // Re-bind zoom listener for newly added items
            attachZoomListeners();

            // Hide spinner and re-enable button
            btnSpinner.classList.add('d-none');
            loadMoreBtn.disabled = false;

            // Hide button if maximum limit is reached
            if (loadedCount >= maxItems) {
                loadMoreBtn.parentElement.innerHTML = '<p class="text-muted fw-semibold">All gallery items loaded.</p>';
            }
        }, 800);
    });
});