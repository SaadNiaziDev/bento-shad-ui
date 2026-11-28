---
title: Combobox
description: A text field that filters a list as you type. Pick one value, or several shown as chips.
group: Forms
---

```html preview
<div
    class="bk-field"
    style="width: 300px"
>
    <label
        class="bk-label"
        for="cb-city"
    >
        Destination
    </label>
    <div
        class="bk-combobox"
        data-name="city"
    >
        <div class="bk-combobox-control">
            <input
                class="bk-combobox-input"
                id="cb-city"
                placeholder="Search cities"
            />
            <button
                class="bk-combobox-clear"
                aria-label="Clear destination"
            ></button>
            <button
                class="bk-combobox-toggle"
                tabindex="-1"
                aria-label="Show cities"
            ></button>
        </div>
        <div
            class="bk-combobox-list"
            popover="manual"
        >
            <div
                class="bk-combobox-group"
                aria-label="Portugal"
            >
                <div class="bk-combobox-group-heading">Portugal</div>
                <div
                    class="bk-combobox-option"
                    data-value="lisbon"
                    data-keywords="portugal"
                    aria-selected="true"
                >
                    Lisbon
                </div>
                <div
                    class="bk-combobox-option"
                    data-value="porto"
                    data-keywords="portugal"
                >
                    Porto
                </div>
            </div>
            <div
                class="bk-combobox-group"
                aria-label="Brazil"
            >
                <div class="bk-combobox-group-heading">Brazil</div>
                <div
                    class="bk-combobox-option"
                    data-value="sao-paulo"
                    data-keywords="brazil"
                >
                    São Paulo
                </div>
                <div
                    class="bk-combobox-option"
                    data-value="rio"
                    data-keywords="brazil"
                    aria-disabled="true"
                >
                    Rio de Janeiro (sold out)
                </div>
            </div>
            <div class="bk-combobox-empty">No cities match.</div>
        </div>
    </div>
</div>
```

Type "sao" to find São Paulo, or "portugal" to list both Portuguese cities. Matching ignores case and accents, and every word you type has to appear in the label or its keywords.

## Usage

```tsx
import { Combobox, Field } from 'bento-shad-ui/react';

const cities = [
    { value: 'lisbon', label: 'Lisbon', group: 'Portugal' },
    { value: 'porto', label: 'Porto', group: 'Portugal' },
    { value: 'sao-paulo', label: 'São Paulo', group: 'Brazil' },
];

const [city, setCity] = useState<string | null>('lisbon');

<Field label="Destination">
    <Combobox
        options={cities}
        value={city}
        onValueChange={setCity}
        placeholder="Search cities"
        clearable
    />
</Field>;
```

Add `multiple` to pick several. The value becomes a `string[]`, and `onValueChange` is typed to match:

```tsx
const [cities, setCities] = useState<string[]>([]);

<Combobox
    multiple
    options={options}
    value={cities}
    onValueChange={setCities}
    placeholder="Add cities"
/>;
```

### HTML

Write the options in the markup. The script adds the ARIA roles, ids and keyboard handling. Mark the starting choice with `aria-selected="true"` and unavailable options with `aria-disabled="true"`.

```html
<div
    class="bk-combobox"
    data-name="city"
>
    <div class="bk-combobox-control">
        <input
            class="bk-combobox-input"
            id="city"
            placeholder="Search cities"
        />
        <button
            class="bk-combobox-toggle"
            tabindex="-1"
            aria-label="Show cities"
        ></button>
    </div>
    <div
        class="bk-combobox-list"
        popover="manual"
    >
        <div
            class="bk-combobox-option"
            data-value="lisbon"
        >
            Lisbon
        </div>
        <div class="bk-combobox-empty">No cities match.</div>
    </div>
</div>
```

| Attribute | On | Effect |
|---|---|---|
| `data-multiple` | `.bk-combobox` | Pick several values, shown as chips |
| `data-name` | `.bk-combobox` | Adds hidden inputs with this name, so the value is sent with the form |
| `data-value` | `.bk-combobox-option` | Value sent and reported. Defaults to the option's text |
| `data-label` | `.bk-combobox-option` | Text for the field and chips, when the option holds more than its label |
| `data-keywords` | `.bk-combobox-option` | Extra words that match the search |

The combobox fires `bk:change` with `{ value, values }`. `value` is the selected value, or the first one in a multiple combobox; `values` lists them all.

## Examples

### Several values

Selected people show as chips. Backspace in the empty field removes the last chip, and the list stays open so you can keep picking.

```html preview
<div
    class="bk-field"
    style="width: 340px"
>
    <label
        class="bk-label"
        for="cb-people"
    >
        Travellers
    </label>
    <div
        class="bk-combobox"
        data-multiple
        data-name="travellers"
    >
        <div class="bk-combobox-control">
            <input
                class="bk-combobox-input"
                id="cb-people"
                placeholder="Add people"
            />
            <button
                class="bk-combobox-clear"
                aria-label="Remove everyone"
            ></button>
            <button
                class="bk-combobox-toggle"
                tabindex="-1"
                aria-label="Show people"
            ></button>
        </div>
        <div
            class="bk-combobox-list"
            popover="manual"
        >
            <div
                class="bk-combobox-option"
                data-value="mira"
                data-label="Mira Okafor"
                data-keywords="mira@example.com design"
                aria-selected="true"
            >
                <span class="bk-combobox-option-text">
                    <span>Mira Okafor</span>
                    <span class="bk-combobox-option-description">
                        Design · mira@example.com
                    </span>
                </span>
            </div>
            <div
                class="bk-combobox-option"
                data-value="theo"
                data-label="Theo Lindqvist"
                data-keywords="theo@example.com engineering"
            >
                <span class="bk-combobox-option-text">
                    <span>Theo Lindqvist</span>
                    <span class="bk-combobox-option-description">
                        Engineering · theo@example.com
                    </span>
                </span>
            </div>
            <div
                class="bk-combobox-option"
                data-value="zara"
                data-label="Zara Haddad"
                data-keywords="zara@example.com finance"
            >
                <span class="bk-combobox-option-text">
                    <span>Zara Haddad</span>
                    <span class="bk-combobox-option-description">
                        Finance · zara@example.com
                    </span>
                </span>
            </div>
            <div
                class="bk-combobox-option"
                data-value="kofi"
                data-label="Kofi Mensah"
                data-keywords="kofi@example.com operations"
            >
                <span class="bk-combobox-option-text">
                    <span>Kofi Mensah</span>
                    <span class="bk-combobox-option-description">
                        Operations · kofi@example.com
                    </span>
                </span>
            </div>
            <div class="bk-combobox-empty">Nobody by that name.</div>
        </div>
    </div>
    <p class="bk-field-description">Search by name, team or email.</p>
</div>
```

### React to a change

Listen for `bk:change` to update the rest of the page. The script below is the one running in this preview.

```html preview
<div
    class="bk-stack"
    style="width: 300px"
>
    <div class="bk-field">
        <label
            class="bk-label"
            for="cb-currency"
        >
            Currency
        </label>
        <div
            class="bk-combobox"
            data-currency
        >
            <div class="bk-combobox-control">
                <input
                    class="bk-combobox-input"
                    id="cb-currency"
                    placeholder="Search currencies"
                />
                <button
                    class="bk-combobox-toggle"
                    tabindex="-1"
                    aria-label="Show currencies"
                ></button>
            </div>
            <div
                class="bk-combobox-list"
                popover="manual"
            >
                <div
                    class="bk-combobox-option"
                    data-value="EUR"
                    data-keywords="euro"
                    aria-selected="true"
                >
                    EUR, Euro
                </div>
                <div
                    class="bk-combobox-option"
                    data-value="GBP"
                    data-keywords="pound sterling"
                >
                    GBP, British pound
                </div>
                <div
                    class="bk-combobox-option"
                    data-value="JPY"
                    data-keywords="yen"
                >
                    JPY, Japanese yen
                </div>
                <div
                    class="bk-combobox-option"
                    data-value="PKR"
                    data-keywords="rupee pakistan"
                >
                    PKR, Pakistani rupee
                </div>
                <div class="bk-combobox-empty">No currency found.</div>
            </div>
        </div>
    </div>
    <p
        class="bk-field-description"
        data-currency-status
        aria-live="polite"
    >
        Prices show in EUR.
    </p>
</div>
```

```js demo
document
    .querySelector('[data-currency]')
    .addEventListener('bk:change', (event) => {
        const status = document.querySelector('[data-currency-status]');
        status.textContent = event.detail.value
            ? `Prices show in ${event.detail.value}.`
            : 'Pick a currency to see prices.';
    });
```

### Results from a server

Pass `filter={false}` so the component shows `options` as given, and load them in `onInputChange`. `loading` shows a status row while a request is in flight.

```tsx
const [query, setQuery] = useState('');
const [results, setResults] = useState<ComboboxOption[]>([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
    if (!query) return setResults([]);
    setLoading(true);
    const request = new AbortController();
    fetch(`/api/airports?q=${encodeURIComponent(query)}`, {
        signal: request.signal,
    })
        .then((response) => response.json())
        .then((airports) =>
            setResults(
                airports.map((a) => ({
                    value: a.code,
                    label: a.name,
                    description: a.city,
                })),
            ),
        )
        .finally(() => setLoading(false));
    return () => request.abort();
}, [query]);

<Combobox
    options={results}
    filter={false}
    onInputChange={setQuery}
    loading={loading}
    emptyText={query ? 'No airports found.' : 'Type to search airports.'}
/>;
```

## API

### Combobox

<!-- props: ComboboxProps -->

### Combobox with `multiple`

<!-- props: ComboboxMultipleProps -->

### ComboboxOption

| Field | Type | Description |
|---|---|---|
| `value` | `string` | Value sent and passed to `onValueChange`. Unique within the list |
| `label` | `string` | Text in the list, the field and chips |
| `description` | `string` | Second line in the list |
| `icon` | `ReactNode` | Icon before the label |
| `keywords` | `string[]` | Extra words that match the search |
| `group` | `string` | Heading the option is listed under |
| `disabled` | `boolean` | Shown but not selectable |

`filterComboboxOptions(options, query)` applies the default matching if you render your own list.

## Accessibility

- Follows the ARIA combobox pattern with a listbox popup. Focus stays in the input, and `aria-activedescendant` points at the highlighted option so screen readers follow it.
- ↓ / ↑ open the list and move through options, skipping disabled ones. Enter picks, Esc closes and restores the selected label, and Tab moves on.
- In a multiple combobox the listbox is `aria-multiselectable`, and each chip's × button is named "Remove …". The × buttons are left out of the Tab order: Backspace removes the last chip.
- The list is labelled by the field's `<label>`. Without a visible label, give the input an `aria-label`.
- Selected options have a check mark as well as heavier text, so the state does not depend on colour.
- For a short fixed list on phones, a native [Select](select.md) may be easier to use.
