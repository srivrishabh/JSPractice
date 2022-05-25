var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var CustomLinkedList;
(function (CustomLinkedList) {
    class Node {
    }
    CustomLinkedList.Node = Node;
    class Collections {
        static sort(list, comparator) {
            if (list.length() === 0 || list.length() === 1) {
                return;
            }
            this.quickSort(list, 0, list.length() - 1, comparator);
        }
        static quickSort(list, lo, hi, comparator) {
            if (lo > hi) {
                return;
            }
            const pivot = list.getAt(hi);
            const pivotIndex = this.partition(list, pivot, comparator);
            this.quickSort(list, lo, pivotIndex - 1, comparator);
            this.quickSort(list, pivotIndex + 1, hi, comparator);
        }
        static partition(list, pivot, comparator) {
            let i = 0, j = 0;
            while (i < list.length()) {
                const node = list.getAt(i);
                if (comparator(node, pivot) === 1) {
                    i++;
                }
                else {
                    this.swapNodesData(list, i, j);
                    i++;
                    j++;
                }
            }
            return j - 1;
        }
        static swapNodesData(list, i, j) {
            const ith = list.getAt(i);
            const jth = list.getAt(j);
            let temp = ith.data;
            ith.data = jth.data;
            jth.data = temp;
        }
    }
    CustomLinkedList.Collections = Collections;
    class LinkedList {
        constructor() {
            this.head = null;
            this.tail = null;
            this.size = 0;
        }
        length() {
            return this.size;
        }
        addLast(data) {
            const node = new Node();
            node.data = data;
            node.next = node.prev = null;
            if (this.size === 0) {
                this.head = this.tail = node;
            }
            else {
                node.prev = this.tail;
                this.tail.next = node;
                this.tail = node;
            }
            this.size++;
        }
        addFirst(data) {
            const node = new Node();
            node.data = data;
            node.next = node.prev = null;
            if (this.size === 0) {
                this.head = this.tail = node;
            }
            else {
                node.next = this.head;
                this.head.prev = node;
                this.head = node;
            }
            this.size++;
        }
        addAt(idx, data) {
            if (idx >= this.size) {
                console.log("List out of bounds");
                return;
            }
            if (idx === 0) {
                this.addFirst(data);
            }
            else if (idx === this.size - 1) {
                this.addLast(data);
            }
            else {
                const node = new Node();
                node.data = data;
                node.next = node.prev = null;
                if (idx <= this.size / 2) {
                    let temp = this.head;
                    for (let i = 0; i < idx; i++) {
                        temp = temp.next;
                    }
                    temp.prev.next = node;
                    node.prev = temp.prev;
                    node.next = temp;
                    temp.prev = node;
                }
                else {
                    let temp = this.tail;
                    for (let i = this.size - 1; i > idx; i--) {
                        temp = temp.prev;
                    }
                    temp.prev.next = node;
                    node.prev = temp.prev;
                    node.next = temp;
                    temp.prev = node;
                }
            }
        }
        getFirst() {
            if (this.size === 0) {
                return null;
            }
            return this.head;
        }
        getLast() {
            if (this.size === 0) {
                return null;
            }
            return this.tail;
        }
        getAt(idx) {
            if (this.size === 0) {
                return null;
            }
            if (idx > this.size - 1 || idx < 0) {
                return null;
            }
            else if (idx === 0) {
                return this.getFirst();
            }
            else if (idx === this.size - 1) {
                return this.getLast();
            }
            else {
                if (idx <= this.size / 2) {
                    let temp = this.head;
                    for (let i = 0; i < idx; i++) {
                        temp = temp.next;
                    }
                    return temp;
                }
                else {
                    let temp = this.tail;
                    for (let i = this.size - 1; i > idx; i--) {
                        temp = temp.prev;
                    }
                    return temp;
                }
            }
        }
        removeFirst() {
            if (this.size == 0) {
                console.log("List underflow");
                return null;
            }
            else if (this.size === 1) {
                const node = this.head;
                this.head = this.tail = null;
                this.size = 0;
                return node;
            }
            else {
                const node = this.head;
                this.head.prev = null;
                this.head = this.head.next;
                node.next = null;
                this.size--;
                return node;
            }
        }
        removeLast() {
            if (this.size === 0) {
                console.log("List underflow");
            }
            else if (this.size == 1) {
                const node = this.head;
                this.head = this.tail = null;
                this.size--;
                return node;
            }
            else {
                const node = this.tail;
                this.tail = this.tail.prev;
                this.tail.next = null;
                node.prev = null;
                this.size--;
                return node;
            }
        }
        removeAt(idx) {
            if (this.size === 0) {
                console.log("List underflow");
                return;
            }
            else if (idx >= this.size) {
                console.log("List Index out of bound");
                return;
            }
            else if (idx === 0) {
                return this.removeFirst();
            }
            else if (idx == this.size - 1) {
                return this.removeLast();
            }
            else {
                if (idx <= this.size / 2) {
                    let temp = this.head;
                    for (let i = 0; i < idx; i++) {
                        temp = temp.next;
                    }
                    temp.prev.next = temp.next;
                    temp.next.prev = temp.prev;
                    temp.next = temp.prev = null;
                    this.size--;
                    return temp;
                }
                else {
                    let temp = this.tail;
                    for (let i = this.size - 1; i > idx; i--) {
                        temp = temp.prev;
                    }
                    temp.prev.next = temp.next;
                    temp.next.prev = temp.prev;
                    temp.next = temp.prev = null;
                    this.size--;
                    return temp;
                }
            }
        }
        display() {
            if (this.size === 0) {
                console.log("List empty");
                return;
            }
            let temp = this.head;
            while (temp != null) {
                console.log(temp.data);
                temp = temp.next;
            }
        }
        *[Symbol.iterator]() {
            if (this.size === 0) {
                return;
            }
            let temp = this.head;
            while (temp != null) {
                yield temp.data;
                temp = temp.next;
            }
        }
    }
    CustomLinkedList.LinkedList = LinkedList;
})(CustomLinkedList || (CustomLinkedList = {}));
let linkedList = new CustomLinkedList.LinkedList();
linkedList.addLast(77);
linkedList.addLast(88);
linkedList.addLast(10);
linkedList.addLast(45);
linkedList.addLast(23);
linkedList.addLast(90);
console.log('\n');
linkedList.display();
console.log('\n');
(() => __awaiter(this, void 0, void 0, function* () {
    var e_1, _a;
    CustomLinkedList.Collections.sort(linkedList, function (a, b) {
        return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
    });
    try {
        for (var linkedList_1 = __asyncValues(linkedList), linkedList_1_1; linkedList_1_1 = yield linkedList_1.next(), !linkedList_1_1.done;) {
            const data = linkedList_1_1.value;
            console.log(data);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (linkedList_1_1 && !linkedList_1_1.done && (_a = linkedList_1.return)) yield _a.call(linkedList_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}))();
//# sourceMappingURL=build.js.map
