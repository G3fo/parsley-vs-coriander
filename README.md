# Parsley vs Coriander Quiz

An interactive web-based quiz game to help you identify and distinguish between parsley and coriander (cilantro). Test your herb identification skills with different difficulty levels and an educational learn mode!

## Features

### Core Gameplay
- **Image-Based Quiz**: Identify whether images show parsley or coriander
- **Immediate Feedback**: Get instant visual feedback on your answers
- **Score Tracking**: Track your accuracy and performance throughout the session

### Difficulty Levels
Choose from three difficulty settings:
- **Easy**: Close-up shots with clear distinctive features
- **Medium**: Partial plant shots with moderate clarity
- **Hard**: Full plant views or tricky angles requiring careful observation

### Learn Mode
Toggle Learn Mode to:
- See the correct answer before guessing
- Study detailed educational information about both herbs
- Learn key differences in leaf shape, stems, taste, and appearance
- Perfect for studying before testing yourself!

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Clean, modern interface with smooth animations
- Accessible color contrast and readable fonts

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Installation

1. **Clone or download** this repository to your local machine

2. **Open the app**: Simply open `index.html` in your web browser
   - Double-click `index.html`, or
   - Right-click and select "Open with" your preferred browser

3. **Start playing!** No server or installation needed.

## Project Structure

```
cilantro/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── script.js           # Game logic and state management
├── images.js           # Image data organized by difficulty
├── images/             # Folder for image assets
│   ├── parsley/        # Your parsley images go here
│   └── coriander/      # Your coriander images go here
└── README.md           # This file
```

## Using Your Own Images

The app currently uses placeholder images from Unsplash. To use your own images:

### Method 1: Replace URLs in images.js

1. Open `images.js`
2. For each image object, replace the `url` field with your image URL or local path
3. Update the `description` field to match your image

Example:
```javascript
{
    url: 'images/parsley/parsley-closeup-1.jpg',  // Your local image
    answer: 'parsley',
    description: 'Close-up of fresh parsley leaves'
}
```

### Method 2: Add Local Images

1. **Collect Images**: Gather high-quality photos of parsley and coriander
   - Aim for 6-10 images per difficulty level
   - Ensure good variety in angles, lighting, and distances

2. **Organize Images**: Place your images in the appropriate folders:
   ```
   images/parsley/
   images/coriander/
   ```

3. **Update images.js**: Modify the `imageDatabase` object in `images.js`:
   ```javascript
   easy: [
       {
           url: 'images/parsley/easy-1.jpg',
           answer: 'parsley',
           description: 'Close-up of parsley with clear serrated edges'
       },
       {
           url: 'images/coriander/easy-1.jpg',
           answer: 'coriander',
           description: 'Coriander leaves showing rounded shape'
       },
       // Add more images...
   ]
   ```

4. **Refresh the page** in your browser to see your images!

### Image Guidelines
- **Format**: JPG, PNG, or WebP
- **Size**: 800-1200px width recommended for good quality
- **Aspect Ratio**: Any ratio works (the app handles different sizes)
- **Quality**: Clear, well-lit photos work best
- **Easy images**: Close-ups of leaves with distinctive features clearly visible
- **Medium images**: Partial plant shots, moderate distance
- **Hard images**: Full plant, tricky angles, or mixed lighting

## How to Play

1. **Select Difficulty**: Choose Easy, Medium, or Hard
2. **Enable Learn Mode (optional)**: Toggle on to see answers and educational content
3. **Look at the image** carefully
4. **Make your guess**: Click either "Parsley" or "Coriander"
5. **Get feedback**: See if you were correct and learn why
6. **Continue**: Click "Next Image" to try another one
7. **Track your progress**: Watch your score and accuracy improve!

## Educational Content

The app teaches you the key differences:

### Parsley
- **Leaf Shape**: Pointed, serrated leaves with sharp edges
- **Stems**: Thicker, sturdier stems
- **Taste**: Mild, slightly peppery, fresh taste
- **Appearance**: Darker green, triangular leaf shape

### Coriander/Cilantro
- **Leaf Shape**: Rounded, softer leaves with gentle curves
- **Stems**: Thinner, more delicate stems
- **Taste**: Citrusy, bright flavor (some find it soapy)
- **Appearance**: Lighter green, rounded fan-like shape

## Technical Details

### Technologies Used
- Pure HTML5
- CSS3 with modern features (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (ES6+)
- No frameworks or build tools required

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

### Features
- Responsive design (mobile-first approach)
- Smooth animations and transitions
- Fisher-Yates shuffle for random image selection
- No repeats until all images in pool are shown
- Session-based score tracking

## Future Enhancements

Potential features for future versions:
- Persistent high scores using localStorage
- Streak counter for consecutive correct answers
- Sound effects for feedback
- More detailed statistics and progress tracking
- Multiplayer/competitive mode
- Custom image upload functionality
- Timed challenges
- Additional herbs (basil, mint, etc.)

## Troubleshooting

### Images not loading
- Check that image paths in `images.js` are correct
- Ensure image files exist in the specified locations
- Check browser console (F12) for error messages
- Verify image formats are supported (JPG, PNG, WebP)

### App not working
- Make sure all files are in the same directory
- Open browser console (F12) to check for JavaScript errors
- Ensure you're using a modern browser with JavaScript enabled
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Styling issues
- Clear browser cache
- Ensure `styles.css` is in the same directory as `index.html`
- Check that the CSS link in `index.html` is correct

## Contributing

This is a personal learning project, but feel free to:
- Use it for your own herb identification training
- Customize it for other similar identification tasks
- Adapt the code for educational purposes
- Share feedback or suggestions

## License

This project is open source and available for personal and educational use.

## Credits

- Placeholder images from [Unsplash](https://unsplash.com)
- Built with vanilla web technologies
- No external libraries or frameworks used

---

Happy herb identifying! May you never confuse parsley with coriander again!
