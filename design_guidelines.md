# Commercial Deal Tracking Dashboard Design Guidelines

## Design Approach: Design System-Based
**Selected System**: Material Design with enterprise customizations
**Justification**: This is a utility-focused, information-dense application for tracking commercial real estate deals. Users prioritize efficiency, data clarity, and quick decision-making over visual appeal.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 220 15% 25% (professional navy)
- Dark Mode: 220 15% 85% (light gray-blue)

**Background Colors:**
- Light Mode: 0 0% 98% (near white)
- Dark Mode: 220 15% 8% (dark navy)

**Status Colors:**
- Success (Executed): 120 60% 50%
- Warning (On Hold): 45 100% 60%
- Error (Dead/Withdrawn): 0 70% 55%
- Info (In Progress): 210 80% 60%

### B. Typography
**Font Family**: Inter via Google Fonts CDN
**Hierarchy:**
- Headers: 600 weight, 18-24px
- Body text: 400 weight, 14-16px
- Data labels: 500 weight, 12-14px
- Small metadata: 400 weight, 12px

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, h-8)
**Grid**: CSS Grid for deal cards, Flexbox for internal components
**Breakpoints**: Desktop-first design optimized for 1200px+ screens

### D. Component Library

**Navigation:**
- Top navigation bar with logo, search, and user menu
- Minimal sidebar for filters and views
- Breadcrumb navigation for drill-down views

**Deal Progress Indicators:**
- Horizontal progress bars with 10 distinct stage markers
- Current stage highlighted with primary color
- Completed stages in muted success color
- Future stages in light gray

**Data Displays:**
- Card-based layout for individual deals
- Compact table view option for list browsing
- Status badges with appropriate color coding
- Weekly progression timeline component

**Forms & Controls:**
- Search and filter controls in top bar
- Dropdown selectors for status filtering
- Date range picker for historical views

**Weekly History Component:**
- 4-column timeline showing weeks (Current, Week -1, Week -2, Week -3)
- Compact stage indicators for each week
- Visual arrows showing progression direction

### E. Deal Stage Visual Treatment
**Stage Representation:**
1. **Prospecting** - Light blue circle
2. **Active Discussions** - Blue circle
3. **Site Approved** - Green circle
4. **LOI** - Orange circle
5. **IC Approved** - Purple circle
6. **In Legal** - Yellow circle
7. **Executed** - Dark green circle
8. **On Hold** - Gray circle
9. **Dead** - Red circle
10. **Withdrawn** - Dark red circle

**Progress Bar Design:**
- Connected circles with progress line
- Current stage: filled circle with ring
- Completed stages: filled circles
- Future stages: outlined circles

### F. Data Organization
**Primary View**: Card grid showing deals with key information:
- Address and location
- Current stage with visual indicator
- RSF and deal type
- Broker and owner information
- 4-week progression mini-timeline

**Detailed View**: Expandable cards or modal with full deal information and complete historical progression

### G. Responsive Considerations
- Desktop-optimized layout (primary use case)
- Tablet: Simplified card layout
- Mobile: Stacked vertical layout with condensed information

## Key UX Principles
1. **Information Density**: Maximize visible deals without overwhelming
2. **Quick Scanning**: Clear visual hierarchy for rapid deal assessment
3. **Status Clarity**: Immediate understanding of deal progression
4. **Historical Context**: Easy access to weekly progression data
5. **Professional Aesthetics**: Clean, business-appropriate visual design

## Images
No hero images or decorative graphics needed. This is a data-focused utility application where visual elements should support information consumption rather than create visual appeal.