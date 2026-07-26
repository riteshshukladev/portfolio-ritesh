
# Half a Map: Go's Nil Map Behaviour

A walkthrough of why Go lets you declare a map that panics on write, what actually differs between a nil map and an empty one, and where this "half-usable" zero value earns its keep in real code.

---

## 1. Summary

In Go, a map declared with `var` and never initialized is called a **nil map**. It behaves like a fully valid map for every read-like operation — `len()`, key lookups, `range` — but panics the moment you try to write to it.

This isn't a bug or an oversight. It follows directly from Go's zero-value rule: every type gets a default value when declared without an initializer, and for maps (along with slices, channels, and pointers) that default is `nil`. Understanding this distinction — and how it differs from an empty-but-initialized map — clears up a lot of confusion around JSON marshaling, optional struct fields, and defensive nil-checks.

## 2. The Nil Map: What "Read-Only" Actually Means

A map declared with `var` and left uninitialized is nil, and it's read-only.

By read-only, I mean we can perform all the operations that are normally done on a map created with `make` or `:=` — like `len()`, retrieving a value, or checking if a key exists — without any panic. But writing to the map will trigger a panic.

When reading from a nil map, it returns the zero value for the operation, but it never panics.

```go
var m map[string]int   // nil map, no keys at all

x := m["hello"]        // works — returns 0 (the zero value for int)
                        // because "hello" isn't in the map

fmt.Println(len(m))    // works — prints 0 (no keys)

for k, v := range m {   // works — loop body just never runs,
    fmt.Println(k, v)   // because there's nothing to iterate over
}

v, ok := m["hello"]     // works — v = 0, ok = false
                        // (ok tells you "hello" wasn't found)
```

> **Design note:** This "safe to read, unsafe to write" behaviour is deliberate. Maps and slices are built so their zero value is safe to read from, which removes a whole category of nil-check bugs in read-heavy code. Pointers don't get this same treatment — dereferencing a nil pointer panics even on read.

## 3. Why Go's Maintainers Aren't "Fixing" This

Because in Go, every type has a zero value. For `int` it's `0`, for `bool` it's `false`, and likewise for composite data types such as pointers, maps, and slices, it's `nil`.

Primitive variables declared with `var` — such as `int`, `float`, or `string` — are fully usable right away. Composite data types, on the other hand, are only partially usable once declared this way.

For example, `var a int` gives `a` the zero value `0`. Doing `a + 5` right after works fine, no error. Doing the equivalent on composite types will panic.

One possible fix could be making Go automatically call `make()` internally whenever a map is declared, so it's always 100% ready to use. But then you'd always have to wonder whether this is one of those types where `var` secretly does extra setup for you. Instead, Go says: we won't alter our rules. A variable declared with `var` but not initialized will sometimes be fully usable (if it's a primitive type) and sometimes only partially usable (if it's a composite type). It's about consistency, not about breaking the paradigm.

## 4. Nil vs. Empty: What Actually Differs

When declaring a map with `var m map[string]int = map[string]int{"abc": 1}` or using the `make` keyword, Go's runtime actually allocates memory for it. Even an empty map created with `make` or `:=` is a normal map — both read and write are permitted, without any error or panic.

But when a map is only declared with `var` and never initialized, Go doesn't allocate any memory for it — there's no location in memory to store anything. That's why write operations aren't allowed. Reads are still permitted, because they don't need to return something solid — they just tell you that there's nothing there.

A variable declared with `make` or `:=` and given no keys is simply an **empty map**, not a nil one. It's a real, allocated map that just happens to have zero entries in it, which is different from a map that was never allocated in the first place.

```go
m := make(map[string]int)

m == nil     // false
len(m)       // 0
```

Since the map already has memory allocated to it, it doesn't have a zero value in the traditional sense. The moment you provide an initialization — whether through `make()` or a literal — you're no longer relying on the zero value. You're explicitly constructing a real value, so the zero-value fallback never kicks in.

A map first declared but not initialized (a nil map) can later be initialized using `make`, and once that happens, both read and write operations work fine on it.

## 5. Where Nil Maps Actually Earn Their Keep

### 5.1 Avoiding wasted memory when a map might never be needed

```go
type User struct {
    Name     string
    Metadata map[string]string   // most users don't have metadata
}

u := User{Name: "Alice"}   // Metadata stays nil, zero memory allocated for it
```

If Go forced you to `make()` this map every single time you created a `User`, you'd be allocating memory for thousands of users who never even use `Metadata`. Nil lets you defer that cost until it's actually needed.

### 5.2 Using nil as a "not found" signal from a function

```go
func getUserPermissions(userID string) map[string]bool {
    user, exists := database[userID]
    if !exists {
        return nil   // signals "no such user"
    }
    return user.Permissions
}

perms := getUserPermissions("bob")
if perms == nil {
    fmt.Println("user not found")
}
```

Returning `nil` here is cheap and idiomatic. There's no need to construct an empty map just to say "there's nothing here."

### 5.3 JSON APIs — distinguishing "field not set" from "field set but empty"

```go
type Response struct {
    Tags map[string]string `json:"tags,omitempty"`
}
```

If `Tags` is `nil`, then with `omitempty`, the field is omitted entirely from the JSON output. If `Tags` is an empty but initialized map, it shows up as `"tags": {}`.

> **Note:** This only applies when *marshaling* (Go struct → JSON). When *unmarshaling* (JSON → Go struct), `encoding/json` allocates the map for you internally the moment it sees the field present in the incoming payload — you never call `make()` yourself. If the field is absent or explicitly `null`, the struct field stays nil after decoding.

This lets you express "the client never sent tags" versus "the client explicitly sent an empty tags object," which can matter for things like PATCH requests where you need to know if a field was touched at all.

## 6. Quick Reference

| Declaration | Is it nil? | Read? | Write? |
|---|---|---|---|
| `var m map[string]int` | Yes | Yes | No — panics |
| `m := make(map[string]int)` | No (empty) | Yes | Yes |
| `m := map[string]int{"abc": 1}` | No (has data) | Yes | Yes |

> **💬 Have feedback?** If you feel you can add to my learnings with your insights, or if you generally feel that something could be done better here, please let me know at [riteshuklaa@gmail.com](mailto:riteshuklaa@gmail.com).
