/**
 * @file Implementation of the page block
 * @author Andrey Glotov
 */

import * as Header          from '../header/header';
import * as Minicart        from '../mini-cart/mini-cart';
import * as Nav             from '../nav/nav';
import * as Search          from '../search/search';
import * as Tabs            from '../tabs/tabs';

import * as AboutGallery    from '../../about/about-gallery/about-gallery';
import * as ContactForm     from '../../contact/contact-form/contact-form';
import * as ContactMap      from '../../contact/map/map';
import * as Gallery         from '../../index/gallery/gallery';
import * as Menu            from '../../menu/menu/menu';
import * as ReservationForm from '../../reservation/reservation-form/reservation-form';
import * as Slider          from '../../index/slider/slider';
import * as SpecialsSlider  from '../../index/specials-slider/specials-slider';

import * as Portfolio       from '../../portfolio/portfolio/portfolio';
import * as ProjectSlider   from '../../portfolio/project-slider/project-slider';

import * as BlogGallery     from '../../blog/blog-gallery/blog-gallery';
import * as Comment         from '../../blog/comment/comment';
import * as CommentForm     from '../../blog/comment-form/comment-form';
import * as Share           from '../../blog/share/share';

import * as Checkout        from '../../shop/checkout/checkout';
import * as Product         from '../../shop/product/product';
import * as ProductGallery  from '../../shop/product-gallery/product-gallery';
import * as ReviewForm      from '../../shop/review-form/review-form';
import * as ShippingCalc    from '../../shop/shipping-calc/shipping-calc';
import * as ShopFilter      from '../../shop/shop-filter/shop-filter';

// -------------------------- BEGIN MODULE VARIABLES --------------------------
const STICKY_HEADER_OFFSET  = 100;  // Scroll offset to make the header "sticky"
const VISIBLE_HEADER_OFFSET = 500;  // Scroll offset to show the "sticky" header
const RESIZE_INTERVAL       = 200;  // Resize debouncing interval
const SCROLL_INTERVAL       = 200;  // Scroll throttling interval

const HeaderStates = {NORMAL: 0, STICKY: 1, VISIBLE: 2};
let headerState = HeaderStates.NORMAL;

const $header = $('.header');
const isHeaderTransparent = $header.hasClass('header_transparent');

let resizeTimer = null;
let scrollTimer = null;
let wasScrolled = false;
// --------------------------- END MODULE VARIABLES ---------------------------

// ---------------------------- BEGIN DOM METHODS -----------------------------
/**
 * Add or remove header classes basd on the current scroll offset to create an
 * animated sticky header effect.
 */
const updateHeaderStyles = function() {
    const offset = $(window).scrollTop();
    const newState = offset < STICKY_HEADER_OFFSET
        ? HeaderStates.NORMAL
        : (offset < VISIBLE_HEADER_OFFSET
            ? HeaderStates.STICKY
            : HeaderStates.VISIBLE);

    if (newState !== headerState) {
        if (newState === HeaderStates.NORMAL) {
            $header
                .removeClass('page__header_scroll')
                .removeClass('page__header_hidden')
                .toggleClass('header_transparent', isHeaderTransparent);
        } else {
            $header
                .addClass('page__header_scroll')
                .toggleClass(
                    'page__header_hidden',
                    newState === HeaderStates.STICKY
                )
                .removeClass('header_transparent');
        }

        headerState = newState;
    }
};
// ----------------------------- END DOM METHODS ------------------------------

// --------------------------- BEGIN EVENT HANDLERS ---------------------------
const onWindowScroll = function() {
    updateHeaderStyles();
};

const onWindowResize = function() {
    Nav.handleResize();
    Portfolio.handleResize();
    Tabs.handleResize();
};
// ---------------------------- END EVENT HANDLERS ----------------------------

// --------------------------- BEGIN PUBLIC METHODS ---------------------------
/**
 * Initialize the page module.
 * @return true
 */
export const initModule = function() {
    // Initialize handlers for window scroll & resize events
    $(window).on({
        // Debounce the window resize event 
        resize: function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(onWindowResize, RESIZE_INTERVAL);
        },

        // Throttle the window scroll event
        scroll: function() {
            if (scrollTimer) {
                // Ensure that we catch and execute that last invocation
                wasScrolled = true;
                return;
            }

            onWindowScroll();

            scrollTimer = this.setTimeout(function() {
                scrollTimer = null;
                if (wasScrolled) {
                    onWindowScroll();
                    wasScrolled = false;
                }
            }, SCROLL_INTERVAL);
        },
    });

    // Initialize common blocks
    Header.initModule();
    Minicart.initModule();
    Nav.initModule();
    Search.initModule();
    Tabs.initModule();

    // Initialize inner page blocks
    AboutGallery.initModule();
    ContactForm.initModule();
    ContactMap.initModule();
    Gallery.initModule();
    Menu.initModule();
    ReservationForm.initModule();
    Slider.initModule();
    SpecialsSlider.initModule();

    // Initialize portfolio blocks
    Portfolio.initModule();
    ProjectSlider.initModule();

    // Initialize blog blocks
    BlogGallery.initModule();
    Share.initModule();
    Comment.initModule();
    CommentForm.initModule();

    // Initialize shop blocks
    Checkout.initModule();
    Product.initModule();
    ProductGallery.initModule();
    ReviewForm.initModule();
    ShippingCalc.initModule();
    ShopFilter.initModule();

    // Process the initial window size and scroll position
    onWindowResize();
    onWindowScroll();

    return true;
};
// ---------------------------- END PUBLIC METHODS ----------------------------
