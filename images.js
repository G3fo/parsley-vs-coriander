// Image dataset
// Using your local images from images/parsley/ and images/coriander/

const imageDatabase = [
  {
    url: 'images/parsley/pexels-boryslav-13354860.jpg',
    answer: 'parsley',
    description: 'Close-up of parsley leaves showing pointed, serrated edges'
  },
  {
    url: 'images/coriander/chandan-chaurasia-N73L0EzbJ8Y-unsplash.jpg',
    answer: 'coriander',
    description: 'Close-up of coriander/cilantro leaves showing rounded, softer edges'
  },
  {
    url: 'images/parsley/pexels-karola-g-4021601.jpg',
    answer: 'parsley',
    description: 'Fresh parsley bunch with visible serrated leaf pattern'
  },
  {
    url: 'images/coriander/jacqueline-brandwayn-sNjKMbL5xWU-unsplash.jpg',
    answer: 'coriander',
    description: 'Fresh coriander with characteristic rounded leaves'
  },
  {
    url: 'images/parsley/pexels-naimbic-1618906.jpg',
    answer: 'parsley',
    description: 'Parsley leaves with distinct pointed tips'
  },
  {
    url: 'images/coriander/usama-firdous-fCn8XzqyyNo-unsplash.jpg',
    answer: 'coriander',
    description: 'Coriander/cilantro with soft, delicate leaves'
  },
  {
    url: 'images/parsley/pexels-greta-hoffman-7728131.jpg',
    answer: 'parsley',
    description: 'Parsley plant at moderate angle'
  },
  {
    url: 'images/coriander/lindsay-moe-WZzrQX5k2Ug-unsplash.jpg',
    answer: 'coriander',
    description: 'Coriander plant with stems visible'
  },
  {
    url: 'images/parsley/pexels-paul-17198758.jpg',
    answer: 'parsley',
    description: 'Parsley bunch with partial view of leaves'
  },
  {
    url: 'images/coriander/magdalena-olszewska-9rt6gV_IjhA-unsplash.jpg',
    answer: 'coriander',
    description: 'Fresh coriander at moderate distance'
  },
  {
    url: 'images/parsley/pexels-sosovipp-13429346.jpg',
    answer: 'parsley',
    description: 'Parsley with some leaves in shadow'
  },
  {
    url: 'images/coriander/victor-birai-Ks_1oNa0b2U-unsplash.jpg',
    answer: 'coriander',
    description: 'Coriander with mixed lighting'
  },
  {
    url: 'images/parsley/pexels-karola-g-4198111.jpg',
    answer: 'parsley',
    description: 'Full parsley plant from a distance'
  },
  {
    url: 'images/coriander/eric-brehm-bqks6MgxBXc-unsplash.jpg',
    answer: 'coriander',
    description: 'Coriander plant with tricky angle'
  },
  {
    url: 'images/parsley/pexels-msaimakin-28934124.jpg',
    answer: 'parsley',
    description: 'Parsley in natural garden setting'
  },
  {
    url: 'images/coriander/peaky-frames-3wj4wNwNONg-unsplash.jpg',
    answer: 'coriander',
    description: 'Coriander among other herbs'
  },
  {
    url: 'images/parsley/pexels-roman-odintsov-6102658.jpg',
    answer: 'parsley',
    description: 'Parsley with challenging perspective'
  },
  {
    url: 'images/coriander/peaky-frames-9xzw4l722jc-unsplash.jpg',
    answer: 'coriander',
    description: 'Coriander full plant view'
  },
  {
    url: 'images/parsley/pexels-yananadolinska-12178852.jpg',
    answer: 'parsley',
    description: 'Parsley with complex leaf arrangement'
  },
  {
    url: 'images/coriander/peaky-frames-wCJvkQJ77lQ-unsplash.jpg',
    answer: 'coriander',
    description: 'Coriander with detailed leaf structure'
  }
];

// Educational content about the differences
const educationalContent = {
  parsley: {
    leafShape: 'Pointed, serrated leaves with sharp edges',
    stems: 'Thicker, sturdier stems',
    taste: 'Mild, slightly peppery, fresh taste',
    appearance: 'Darker green, triangular leaf shape',
    tips: 'Look for the pointed tips and serrated edges - they\'re the key identifier!'
  },
  coriander: {
    leafShape: 'Rounded, softer leaves with gentle curves',
    stems: 'Thinner, more delicate stems',
    taste: 'Citrusy, bright flavor (some find it soapy)',
    appearance: 'Lighter green, rounded fan-like shape',
    tips: 'Notice the soft, rounded edges and delicate appearance - much gentler than parsley!'
  },
  differences: [
    'Parsley has sharper, more angular leaves while coriander has rounded edges',
    'Parsley stems are thicker and more robust',
    'Coriander leaves are more delicate and fan-like',
    'Parsley is generally darker green',
    'The aroma is very different - parsley is fresh and mild, coriander is citrusy and distinctive'
  ]
};

// Export for use in main script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { imageDatabase, educationalContent };
}
