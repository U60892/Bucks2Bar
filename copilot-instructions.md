# Copilot Instructions for Bucks2Bar

## Project Overview
This is a web-based Income & Expense Tracker application called **Bucks2Bar**. It helps users track their financial transactions with an intuitive, modern interface.

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3.0
- **Storage**: Browser Local Storage
- **Icons/Fonts**: Bootstrap Icons (via CDN)

## Project Structure
```
├── index.html        # Main HTML file with app structure and styling
├── script.js         # Core JavaScript logic and functionality
└── .copilot-instructions.md  # This file
```

## Coding Standards

### HTML/CSS Guidelines
- Use semantic HTML5 elements
- Follow Bootstrap 5 utility classes for layouts
- Use BEM-like naming for custom CSS classes
- Maintain responsive design with Bootstrap's grid system
- Ensure accessibility with proper ARIA labels and semantic elements

### JavaScript Guidelines
- Use modern ES6+ syntax (arrow functions, const/let, template literals)
- Keep functions small and focused (Single Responsibility Principle)
- Use descriptive variable and function names
- Add JSDoc comments for complex functions
- Avoid global variables; use IIFE or modules where needed
- Implement proper error handling

### Style Consistency
- Color Scheme: Purple gradient (#667eea to #764ba2)
- Border Radius: 10-15px for cards and containers
- Shadows: Subtle shadows using `box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1)`
- Spacing: Use Bootstrap's spacing utilities (px, py, m, p classes)
- Font Weight: 500 for interactive elements, 600 for headers

## Key Features
1. **Income & Expense Tracking**: Add, view, and manage financial transactions
2. **Monthly Organization**: Group transactions by month
3. **Categories**: Organize transactions by category
4. **Persistent Storage**: Save data to browser Local Storage
5. **Responsive Design**: Works seamlessly on desktop and mobile devices

## Data Structure
Transactions are stored in Local Storage with the following structure:
```javascript
{
  id: "unique-id",
  type: "income" | "expense",
  amount: number,
  category: string,
  description: string,
  date: "YYYY-MM-DD",
  timestamp: milliseconds
}
```

## Common Tasks

### Adding a New Feature
1. Define the feature requirements clearly
2. Update HTML structure if UI changes are needed
3. Add CSS styling following the project's design guidelines
4. Implement JavaScript logic with proper error handling
5. Test across different screen sizes and browsers

### Modifying Styles
- Prefer Bootstrap utility classes over custom CSS
- Keep custom CSS minimal and well-organized
- Update gradient colors consistently across all elements
- Ensure contrast ratios meet accessibility standards (WCAG 2.1 AA)
- All buttons should be of Red color to maintain consistency

### Managing State
- Use Local Storage for persistence
- Keep transaction data immutable where possible
- Validate data before storing to Local Storage
- Provide clear feedback to users (modals, toasts, alerts)

## Best Practices
- **DRY Principle**: Avoid code duplication; create reusable functions
- **Performance**: Minimize DOM manipulations; use event delegation
- **Accessibility**: Include alt text, ARIA labels, and keyboard navigation
- **Code Comments**: Explain the "why", not the "what" (code is clear enough)
- **Testing**: Manually test new features on multiple browsers and devices
- **Git Commits**: Use clear, descriptive commit messages

## Browser Compatibility
- Target modern browsers (Chrome, Firefox, Safari, Edge)
- Support IE11+ (if required)
- Test responsive design on:
  - Mobile: 320px and up
  - Tablet: 768px and up
  - Desktop: 1024px and up

## Dependencies & Resources
- **Bootstrap 5.3.0**: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`
- **Bootstrap JS**: Included via CDN for interactive components
- **Bootstrap Icons**: Available via CDN if needed

## Performance Considerations
- Lazy load images if applicable
- Minimize reflows/repaints in JavaScript loops
- Cache DOM queries in variables when used multiple times
- Use event delegation for dynamically added elements

## Troubleshooting Guide
- **Data not persisting**: Check browser Local Storage limits
- **Styling issues**: Ensure Bootstrap is properly loaded
- **JavaScript errors**: Check browser console for errors
- **Responsive issues**: Test with Chrome DevTools device emulation

## Future Enhancements
Consider implementing:
- Budget goals and alerts
- Data export (CSV/PDF)
- Charts and analytics (using Chart.js)
- Dark mode toggle
- User authentication
- Backend integration for cloud sync

---
**Last Updated**: February 10, 2026
**Maintained By**: Development Team
