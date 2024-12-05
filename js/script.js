"use strict";
document.addEventListener("DOMContentLoaded", function () {

  //+date picker
  flatpickr(".js-preorder-date", {
    dateFormat: "d.m.Y",
    minDate: "today",
    defaultDate: "today",
    monthSelectorType: "static",
    locale: {
      "firstDayOfWeek": 1 // start week on Monday
    },
    static: true,
  });
  //-date picker

  //+mobile menu
  const headerMenu = document.querySelector('.header-menu');
  const headerMenutBtn = document.querySelectorAll('.js-toggle-menu-btn')
  headerMenutBtn.forEach(function (item) {
    item.addEventListener('click', function () {
      if (document.body.classList.contains('_menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    })
  })
  function openMenu() {
    headerMenutBtn.forEach(function (btn) {
      btn.classList.add('_active');
    });
    window.scrollTo(0, 0)
    headerMenu.classList.add('_active');
    document.body.classList.add('_menu-open');
  }
  function closeMenu() {
    headerMenutBtn.forEach(function (btn) {
      btn.classList.remove('_active');
    });
    headerMenu.classList.remove('_active');
    document.body.classList.remove('_menu-open');
  }
  //-mobile menu
  //+switch theme
  let LbSwitch = document.querySelectorAll('.switch-lb');
  LbSwitch.forEach(function (btn) {
    btn.addEventListener('change', function (e) {
      if (btn.checked) {
        document.documentElement.classList.add('_lb');
        LbSwitch.forEach(function (item) {
          item.checked = true;
        })
      } else {
        document.documentElement.classList.remove('_lb');
        LbSwitch.forEach(function (item) {
          item.checked = false;
        })
      }
    })
  })
  //-switch theme

  //+drop mini menu
  document.addEventListener("click", function (e) {
    let menu = e.target.closest('.drop-menu');
    if (menu) {
      e.preventDefault();
    }
    if (e.target.classList.contains("js-drop-menu-show")) {
      e.preventDefault();
      e.stopPropagation();
      if (menu.classList.contains('_active')) {
        menu.classList.remove('_active')
      } else {
        menu.classList.add('_active')
      }
    }
    if (e.target.classList.contains("drop-menu__drop-btn")) {
      menu.classList.remove('_active')
    }
    document.querySelectorAll('.drop-menu._active').forEach(function (activeMenu) {
      if (activeMenu != menu) {
        activeMenu.classList.remove('_active');
      }
    })
  });
  //-drop mini menu

  //+sidebar filter (mobile)
  const filter = document.querySelector('.sidebar-filter');
  const filterBtn = document.querySelectorAll('.js-filter-toggle')
  filterBtn.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      if (e.target === e.currentTarget) {
        if (filter.classList.contains('_active')) {
          filter.classList.remove('_active');
          document.body.classList.remove('_filter-open');
        } else {
          filter.classList.add('_active');
          document.body.classList.add('_filter-open');
        }
      }
    })
  })
  //-sidebar filter (mobile)

  //+modal
  document.querySelectorAll('[data-modal]').forEach(function (item) {
    item.addEventListener('click', function () {
      let modalId = this.getAttribute('href') || '#' + this.getAttribute('data-modal');
      if (!modalId) return;
      openModal(modalId);
      closeMenu();
    })
  })
  function openModal(modalId) {
    closeModal();
    document.querySelector(modalId).classList.add('_active')
    document.body.classList.add('_modal-open');
    document.body.setAttribute('data-theme-lb', document.documentElement.classList.contains('_lb'))
  }
  document.querySelectorAll('.js-modal-hide').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation();
      if (e.target.classList.contains('js-modal-hide')) {
        let modal = this.closest('.modal');
        closeModal(modal);
      }
    })
  })
  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('_active');
    } else {
      document.querySelectorAll('.modal._active').forEach(function (item) {
        item.classList.remove('_active')
      })
    }
    document.body.classList.remove('_modal-open');
    if (document.body.getAttribute('data-theme-lb') == 'true') {
      document.documentElement.classList.add('_lb');
      LbSwitch.forEach(function (item) {
        item.checked = true;
      })
    } else if (document.body.getAttribute('data-theme-lb') == 'false') {
      document.documentElement.classList.remove('_lb');
      LbSwitch.forEach(function (item) {
        item.checked = false;
      })
    }
    document.body.removeAttribute('data-theme-lb');
  }
  //-modal

  //+set filter to default
  document.querySelectorAll('.js-clean-filter').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      document.querySelectorAll('select.js-select-filter').forEach(function (item) {
        item.tomselect.addItem(item.getAttribute("data-default-value"));
      });
    })
  });
  //-set filter to default

  //+select
  if (document.querySelector(".js-select-model")) {
    new TomSelect(".js-select-model", {
      controlInput: null,
      searchField: null,
      allowEmptyOption: false,
      plugins: ['no_backspace_delete'],
      render: {
        option: function (data, escape) {
          let avatar = '<img class="select__avatar" src="' + escape(data.avatar) + '">'
          return '<div>' + avatar + escape(data.text) + '</div>';
        },
        item: function (data, escape) {
          let avatar = '<img class="select__avatar" src="' + escape(data.avatar) + '">'
          return '<div>' + avatar + escape(data.text) + '</div>';
        }
      }
    });
  }

  document.querySelectorAll('.js-select-init').forEach(function (item) {
    new TomSelect(item, {
      controlInput: null,
      searchField: null,
      //hideSelected: true,
      allowEmptyOption: true,
      plugins: ['no_backspace_delete'],
    });
  });

  document.querySelectorAll('.js-select-init-multiple').forEach(function (item) {
    new TomSelect(item, {
      //controlInput: null,
      //searchField: null,
      //hideSelected: true,
      allowEmptyOption: false,
      //plugins: ['no_backspace_delete'],
      hidePlaceholder: true,
      onItemAdd: function () {
        this.setTextboxValue('');
        this.refreshOptions();
      }
    });
  });
  //-select

  //+slider photo gallery
  var SwiperGalleryLeft = new Swiper(".photo-gallery-left", {
    spaceBetween: 10,
    slidesPerView: "auto",
    freeMode: true,
    watchSlidesProgress: true,
    direction: 'horizontal',
    watchOverflow: true,
    navigation: {
      nextEl: ".photo-gallery-left-next",
      prevEl: ".photo-gallery-left-prev",
    },
    breakpoints: {
      992: {
        direction: 'vertical',
      }
    }
  });
  var SwiperGalleryRight = new Swiper(".photo-gallery-right", {
    spaceBetween: 20,
    watchOverflow: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    thumbs: {
      swiper: SwiperGalleryLeft,
    },
    navigation: {
      nextEl: ".photo-gallery-right-next",
      prevEl: ".photo-gallery-right-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 1
      }
    }
  });
  //-slider gallery

  //+load image
  let cardPhotoBlank = document.querySelector('.card-photo._hidden');
  let photosList = document.querySelector('.js-photos');
  document.querySelectorAll('.js-add-photo').forEach(function (item) {
    item.addEventListener('change', function () {
      if (this.files && this.files.length > 0) {
        let file = this.files[0];
        if (file.type == 'image/svg+xml' || file.type == 'image/x-png' || file.type == 'image/png' || file.type == 'image/bmp' || file.type == 'image/jpeg' || file.type == 'image/jpg') {
          if (this.files[0].size > 50000000) {
            this.value = '';
            return false;
          }
          let input = this;
          if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              let newCard = cardPhotoBlank.cloneNode(true);
              newCard.classList.remove('_hidden');
              let imageContainer = newCard.querySelector('.card-photo__img');
              imageContainer.setAttribute('src', e.target.result);
              photosList.appendChild(newCard);
            }
            reader.readAsDataURL(input.files[0]);
          }
        }
      } else {
        imageContainer.innerHTML = '';
      }
    })
  })
  //-load image
  //+load image Drag-and-drop
  document.querySelectorAll('.js-drag-drop-img').forEach(function (item) {
    item.addEventListener('dragover', function (e) {
      e.preventDefault();
    });
    item.addEventListener('dragenter', function (e) {
      this.classList.add('_drag');
      e.preventDefault();
    });
    item.addEventListener('dragleave', function (e) {
      this.classList.remove('_drag');
    });
    item.addEventListener('drop', function (e) {
      let fileInput = item.querySelector('.js-add-photo');
      let fileDrop = item;
      fileDrop.classList.remove('_drag');

      const dT = new DataTransfer();
      dT.items.add(e.dataTransfer.files[0]);
      fileInput.files = e.dataTransfer.files;
      fileInput.dispatchEvent(new Event('change'));
      this.classList.remove('_drag');
      e.preventDefault();
    });
  });
  //-load image Drag-and-drop

  document.addEventListener("click", function (e) {
    //+remove image
    if (e.target.classList.contains("js-remove-photo")) {
      e.target.closest('.js-card-photo').remove();
    }
    //-remove image
    //+set avatar
    if (e.target.classList.contains("js-make-avatar")) {
      document.querySelectorAll('._avatar.js-card-photo').forEach(function (card) {
        card.classList.remove('_avatar');
      });
      e.target.closest('.js-card-photo').classList.add('_avatar');
    }
    //-set avatar
  });
});