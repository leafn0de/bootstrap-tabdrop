bootstrap-tabdrop
=================

A fork of Stefan Petre's bootstrap-tabdrop.js, the original of which can be found at eyecon.ro/bootstrap-tabdrop.

For use with the bootstrap tab component. Creates a tab containing a dropdown menu of tab items that won't fit on the page, when your tabs do not fit in a single row.

Works with horizontal tabs and pills.

## Dependencies

* [Bootstrap](http://twitter.github.com/bootstrap/) 2.0.4+
* [jQuery](http://jquery.com/) 1.7.1+

## Usage

Call the tab drop via javascript on `.nav-tabs` and `.nav-pills` (as appropriate) with an optional options object:

```javascript
$('.nav-pills, .nav-tabs').tabdrop(options);
```

**Note** - do not apply padding directly to the tab container. This will cause the overflow to be calculated incorrectly, and the plugin will not work as expected.

## Options

### text

Allows for customisation of the contents of the toggle anchor on the dropdown tab.

**Type:** `string`

**Default:** `<i class="glyphicon glyphicon-align-justify"></i>`

### position

Supports `right` and `left` positioning. This will determine whether the dropdown tab will be pressed up against the other tabs (left positioning) or pulled to the right (right positioning).

**Type:** `string`

**Default:** `right`

## Methods

### .tabdrop(options)

Initialises a tab drop.
```javascript
.tabdrop(options);
```

### .tabdrop('layout')

Will ensure that tabs are correctly displayed and move items to / from the dropdown as required. This will happen automatically on window resize and when calling `tabdrop()`, but you can call it manually if you desire.
```javascript
.tabdrop('layout');
```