# Writing a Blog Post — Complete Guide

## 1. Creating a new post

Create a `.md` file inside any folder under `content/`. The folder structure determines the category and URL.

```
content/
├── go/
│   └── my-post.md            → /post/go/my-post
├── maths/
├── projects/
│   ├── my-project.md         → /post/projects/my-project
│   └── web-apps/
│       └── demo.md           → /post/projects/web-apps/demo
└── teachings/
```

You can nest folders as deep as you want. Every `.md` file becomes a post automatically.

---

## 2. Title (H1) — the only required thing

The **first `# H1`** in the file becomes the post title. It is **automatically removed from the body** so it never duplicates.

```markdown
# Why DynamoDB dropped ACID
```

If there's no H1, it falls back to `title:` in frontmatter. If neither exists, the filename is used.

### Frontmatter (optional)

You can still use frontmatter for `date` and other metadata:

```markdown
---
date: "2026-02-27"
tags: ["go", "databases"]
---

# Why DynamoDB dropped ACID
```

Supported frontmatter fields:

| Field  | Required? | What happens if missing                         |
|--------|-----------|-------------------------------------------------|
| `date` | No        | Uses file's last-modified timestamp             |
| `tags` | No        | Parsed and stored in JSON, not yet displayed    |

**Do not** put `title:` in frontmatter — the H1 handles it.

---

## 3. Markdown that works

### Headings

```markdown
## Heading 2
### Heading 3
#### Heading 4
```

- `# H1` is reserved for the post title (see above)
- Start your content from `## H2` or lower

### Text styling

```markdown
**bold**
*italic*
`inline code`
```

### Links

```markdown
[visible text](https://example.com)
```

### Lists

```markdown
- unordered item
- another item

1. numbered item
2. another item
```

### Blockquotes

```markdown
> This is a blockquote
```

Renders with a green left border and beige background.

### Code blocks

````markdown
```go
func ShardIndex(userID int64) int {
    return int(userID % NumShards)
}
```
````

The language name goes right after the opening backticks. Supported languages include:
`go`, `js`, `ts`, `jsx`, `tsx`, `python`, `py`, `rust`, `sql`, `bash`, `sh`, `json`, `yaml`, `html`, `css`, and any Prism-compatible language. Code is syntax-highlighted with the One Dark theme. Long lines wrap automatically.

### Inline code

```markdown
Use the `ShardIndex()` function.
```

### Horizontal rule

```markdown
---
```

### Images

```markdown
![](./images/my-photo.png)
```

Place image files in an `images/` folder at the same level as your `.md` file:

```
content/go/
├── my-post.md
└── images/
    ├── my-photo.png
    └── diagram.png
```

The scanner copies the entire `images/` folder to `public/content/` at build time. The path rewrite happens automatically — always use `./images/` prefix in your markdown.

---

## 4. Workflow

```
1. Create  content/<category>/<filename>.md
2. Write   # Title as the first heading
3. Add     images/ folder alongside if needed
4. Run     npm run dev    (or npm run build)
5. Visit   /post/<category>/<filename>
```

The scanner runs automatically on `npm run dev` and `npm run build`. It generates `src/data/contentTree.json` and `src/data/allPosts.json`. No manual steps needed.

---

## 5. Where the post appears

| Location | How |
|----------|-----|
| **Sidebar drawer** | Under the matching category folder, organized by your folder structure. Click the hamburger to open. |
| **URL** | `/post/<category>/<filename>` (matches the folder path, no `.md` extension) |
| **Breadcrumbs** | Auto-generated from the path. Click folder names to open the sidebar. |

---

## 6. Things that don't work

- Tables — no support
- Task lists (`- [ ]`)
- Footnotes
- Raw HTML inside markdown
- Tags are stored in JSON but not yet displayed on the post page
- No related posts, pagination, or search

---

## 7. Quick reference

```markdown
# Post Title                    ← becomes the title, not rendered in body

## Section Heading

**bold text**  *italic text*  `inline code`

[link text](https://example.com)

- list item
- list item

1. numbered item
2. numbered item

> blockquote

`​``go
func main() {
    fmt.Println("hello")
}
`​``

![](./images/photo.png)
```
