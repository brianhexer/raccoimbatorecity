# 🎨 Content Portal - Visual Quick Guide

## Portal Layout

```
WordPress Admin Dashboard
│
├── 📊 Content Manager (NEW!)
│   ├── Dashboard
│   │   ├── Quick Stats
│   │   ├── Quick Actions
│   │   └── Recent Submissions
│   │
│   ├── 📄 Pages & Posts
│   │   ├── View all pages/posts
│   │   └── Create new
│   │
│   ├── 📅 Events
│   │   ├── View events
│   │   ├── Create event
│   │   └── Manage registrations
│   │
│   ├── 🎯 Projects
│   │   ├── View projects
│   │   └── Create project
│   │
│   ├── 💝 Donations
│   │   ├── View campaigns
│   │   └── Create campaign
│   │
│   ├── 👥 Team Members
│   │   ├── View team
│   │   └── Add member
│   │
│   └── ⚙️ Site Settings
│       └── Configure site info
│
└── Other WordPress Menus...
```

---

## Dashboard View

```
┌─────────────────────────────────────────────┐
│          📊 CONTENT MANAGEMENT DASHBOARD    │
│    Manage all your website content here     │
├─────────────────────────────────────────────┤
│                                             │
│  ┌────────────────────────────────────┐   │
│  │  QUICK STATS                       │   │
│  ├────────────────────────────────────┤   │
│  │  12 Donations │ ₹50,000 Raised     │   │
│  │  8 Volunteers │ 145 Event Regs     │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ┌────────────────────────────────────┐   │
│  │  QUICK ACTIONS                     │   │
│  ├────────────────────────────────────┤   │
│  │  [📅 Create Event]                 │   │
│  │  [🎯 Create Project]               │   │
│  │  [📝 Write Blog Post]              │   │
│  │  [👥 Add Team Member]              │   │
│  └────────────────────────────────────┘   │
│                                             │
│  ┌────────────────────────────────────┐   │
│  │  RECENT SUBMISSIONS                │   │
│  ├────────────────────────────────────┤   │
│  │  John Doe - john@email.com         │   │
│  │  Jane Smith - jane@email.com       │   │
│  │  2 hours ago...                    │   │
│  └────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Pages & Posts Manager

```
Pages & Posts
[+ New Post] [+ New Page]

┌─────────────────────────────────────────────┐
│ Title            │ Type  │ Author │ Date    │
├─────────────────────────────────────────────┤
│ Welcome to RACC  │ Page  │ Admin  │ Jan 1   │
│ Our Mission      │ Page  │ Admin  │ Dec 28  │
│ Latest News      │ Post  │ Editor │ Jan 2   │
│ Event Report     │ Post  │ Editor │ Jan 1   │
└─────────────────────────────────────────────┘
```

---

## Events Manager

```
📅 Events
[+ Create Event]

┌─────────────────────────────────────────────┐
│ Event Name       │ Date  │ Status │ Reg.    │
├─────────────────────────────────────────────┤
│ Annual Gala      │ Jan 20│ ✓      │ 45      │
│ Youth Workshop   │ Feb 5 │ ✓      │ 32      │
│ Community Clean  │ Feb 15│ ✓      │ 28      │
│ Fundraiser       │ Mar 1 │ Draft  │ 0       │
└─────────────────────────────────────────────┘
```

---

## Create Event Form

```
CREATE EVENT
═════════════════════════════════════════════

Event Title *
[_________________________________]

Event Date & Time *
[2025-01-20 10:00 AM           ]

Location *
[_________________________________]

Description *
[Rich Text Editor with formatting]
[B] [I] [U] [List] [Link] [Image]
[________________________________________________]
[                                                ]
[________________________________________________]

Max Capacity
[100]

☐ Publish this event

[Save Event] [Cancel]
```

---

## Team Members Manager

```
👥 Team Members
[+ Add Member]

┌─────────────────────────────────────────────┐
│ Name            │ Position       │ Email    │
├─────────────────────────────────────────────┤
│ Rajesh Kumar    │ President      │ raj@...  │
│ Priya Sharma    │ Treasurer      │ priya@..│
│ Arjun Singh     │ Secretary      │ arjun@..│
│ Neha Patel      │ Event Manager  │ neha@..│
└─────────────────────────────────────────────┘
```

---

## Add Team Member Form

```
ADD TEAM MEMBER
═════════════════════════════════════════════

Name *
[_________________________________]

Position *
[_________________________________]

Email
[_________________________________]

Bio
[Rich Text Editor with formatting]
[B] [I] [U] [List] [Link] [Image]
[________________________________________________]
[                                                ]
[________________________________________________]

Photo
[Upload Image] or [Choose from Library]

[Save Member] [Cancel]
```

---

## Site Settings

```
⚙️ SITE SETTINGS
═════════════════════════════════════════════

BASIC INFORMATION
──────────────────
Site Title
[RACC Coimbatore                           ]

Site Tagline
[Empowering Youth to Create Positive Change]

About Us Text
[Rich Text Editor                          ]
[                                           ]
[                                           ]

CONTACT INFORMATION
───────────────────
Phone Number
[+91-XXXXXXXXXX                            ]

Contact Email
[contact@racccoimbatore.org                ]

Office Address
[123 Main Street                           ]
[Coimbatore, Tamil Nadu 641001            ]

[Save Settings]
```

---

## What Content Can You Update?

### Through Content Portal:
✅ All page content
✅ Blog posts
✅ Events (date, location, description)
✅ Projects
✅ Donation campaigns
✅ Team member profiles
✅ Site information
✅ Contact details
✅ About us text

### NOT in Content Portal (but available elsewhere):
- Form submissions (RACC Submissions menu)
- Payment settings (RACC Submissions → Settings)
- User accounts (Users menu)
- Plugins (Plugins menu)
- Theme files (Appearance menu)

---

## Data Organization

```
WEBSITE STRUCTURE
═════════════════════════════════════════════

Website
│
├── Home Page
│   └── Updated via Pages & Posts
│
├── About Us
│   ├── About text (Settings)
│   └── Team members (Team Members)
│
├── Events
│   └── All events (Events)
│
├── Projects
│   └── All projects (Projects)
│
├── Blog
│   └── All posts (Pages & Posts)
│
├── Donations
│   └── Campaigns (Donations)
│
├── Contact
│   └── Contact info (Settings)
│
└── Footer
    └── All links & info (Settings)
```

---

## Typical Workflow

### Create a New Event

1. Click "Content Manager" in left menu
2. Click "Events"
3. Click "Create Event"
4. Fill in details:
   - Event name
   - Date & time
   - Location
   - Description
5. Check "Publish this event"
6. Click "Save Event"
7. ✅ Event is now live!
8. Users can register

### Update Team Profile

1. Click "Content Manager"
2. Click "Team Members"
3. Click "Edit" on member name
4. Update information
5. Click "Save Member"
6. ✅ Changes live immediately!

### Write Blog Post

1. Click "Content Manager"
2. Click "Pages & Posts"
3. Click "New Post"
4. Add title & content
5. Upload featured image
6. Click "Publish"
7. ✅ Post appears on blog!

### Update Site Info

1. Click "Content Manager"
2. Click "Site Settings"
3. Update any field:
   - Site title/tagline
   - Contact info
   - About us text
4. Click "Save Settings"
5. ✅ Changes live immediately!

---

## Quick Reference

### What to Click For...

| Task | Location |
|------|----------|
| Create event | Content Manager → Events |
| Write blog post | Content Manager → Pages & Posts |
| Add team member | Content Manager → Team Members |
| Create donation campaign | Content Manager → Donations |
| Update contact info | Content Manager → Site Settings |
| View all submissions | RACC Submissions → Contacts |
| View all donations | RACC Submissions → Donations |
| View event registrations | RACC Submissions → Event Registrations |

---

## Icons & Colors

### Status Indicators
- 🟢 Published / Active
- 🟡 Draft / Pending
- 🔴 Inactive / Failed

### Menu Icons
- 📊 Dashboard
- 📄 Pages & Posts
- 📅 Events
- 🎯 Projects
- 💝 Donations
- 👥 Team Members
- ⚙️ Settings

---

## Browser Support

Works in:
- ✅ Chrome / Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

Best experience on:
- Desktop/Laptop
- Recent browser versions
- Stable internet connection

---

## Pro Tips

💡 **Save Drafts First**
Before publishing, save as draft to review

💡 **Use Rich Text Editor**
Bold, italics, lists, links make content better

💡 **Add Images**
Use featured images for visual appeal

💡 **Publish in Advance**
Schedule content to publish later

💡 **Check Before Publishing**
Preview content before making it live

💡 **Update Regularly**
Keep content fresh and current

💡 **Organize with Categories**
Use tags for easy searching

---

**Need more help?** See CONTENT_PORTAL_GUIDE.md for detailed instructions.
