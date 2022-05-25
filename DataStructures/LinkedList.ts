namespace CustomLinkedList{
    interface Collection<T>{
        display:() => void;
    }

    export type Integer = number;
    
    export class Node<T>{
        next: Node<T>;
        prev: Node<T>;
        data: T;
    }

    type CType = any;

    type Comparator<T, V> = (a:T, b:V) => number;

    export class Collections{
        static sort(list: LinkedList<CType>, comparator: Comparator<Node<CType>, Node<CType>>): void{
            if(list.length() === 0 || list.length() === 1){
                return;
            }
            this.quickSort(list, 0, list.length() - 1, comparator);
        }

        private static quickSort(list: LinkedList<CType>, lo: number, hi: number, comparator: Comparator<Node<CType>, Node<CType>>): void{
            if(lo > hi){
                return;
            }
            const pivot: Node<CType> = list.getAt(hi);
            const pivotIndex: number = this.partition(list, pivot, comparator);
            this.quickSort(list, lo, pivotIndex - 1, comparator);
            this.quickSort(list, pivotIndex + 1, hi, comparator);
        }

        private static partition(list: LinkedList<CType>, pivot: Node<CType>, comparator: Comparator<Node<CType>, Node<CType>>) : number{
            let i = 0, j = 0; 
            while(i < list.length()){
                const node: Node<CType> = list.getAt(i);
                if(comparator(node, pivot) === 1){
                    i++;
                } else {
                    this.swapNodesData(list, i, j);
                    i++;
                    j++;
                }
            }
            return j - 1;
        }

        private static swapNodesData(list: LinkedList<CType>, i: number, j: number): void{
            const ith = list.getAt(i);
            const jth = list.getAt(j);
            let temp: CType = ith.data;
            ith.data = jth.data;
            jth.data = temp;
        }
    }

    export class LinkedList<T> implements Collection<T>{
        private head: Node<T> | null;
        private tail: Node<T> | null;
        private size: Integer;

        constructor(){
            this.head = null;
            this.tail = null;
            this.size = 0;
        }

        length(): number{
            return this.size;
        }

        addLast(data: T): void{
            const node: Node<T> = new Node();
            node.data = data;
            node.next = node.prev = null;            
            if(this.size === 0){
                this.head = this.tail = node;
            }else{
                node.prev = this.tail;
                this.tail.next = node;
                this.tail = node;
            }
            this.size++;
        }

        addFirst(data: T): void{
            const node: Node<T> = new Node();
            node.data = data;
            node.next = node.prev = null; 
            if(this.size === 0){
                this.head = this.tail = node;
            }else{
                node.next = this.head;
                this.head.prev = node;
                this.head = node;
            }
            this.size++;
        } 

        addAt(idx: number, data: T): void{
            if(idx >= this.size){
                console.log("List out of bounds");
                return;
            }            
            if(idx === 0){
                this.addFirst(data);
            }else if(idx === this.size - 1){
                this.addLast(data);
            }else{
                const node: Node<T> = new Node();
                node.data = data;
                node.next = node.prev = null;
                if(idx <= this.size/2){
                    let temp: Node<T> = this.head;
                    for(let i = 0; i < idx; i++){
                        temp = temp.next;
                    }
                    temp.prev.next = node;
                    node.prev = temp.prev;
                    node.next = temp;
                    temp.prev = node;
                }else{
                    let temp: Node<T> = this.tail;
                    for(let i = this.size - 1; i > idx; i--){
                        temp = temp.prev;
                    }
                    temp.prev.next = node;
                    node.prev = temp.prev;
                    node.next = temp;
                    temp.prev = node;
                }
            }
        }

        getFirst() : Node<T> | null{
            if(this.size === 0){
                return null;
            }
            return this.head;
        }

        getLast() : Node<T> | null{
            if(this.size === 0){
                return null;
            }
            return this.tail;
        }

        getAt(idx: number) : Node<T> | null{
            if(this.size === 0){
                return null;
            }
            if(idx > this.size - 1 || idx < 0){
                return null;
            }else if(idx === 0){
                return this.getFirst();
            }else if(idx === this.size - 1){
                return this.getLast();
            }else{
                if(idx <= this.size/2){
                    let temp:Node<T> = this.head;
                    for(let i = 0; i < idx; i++){
                        temp = temp.next;
                    }
                    return temp;
                }else{
                    let temp:Node<T> = this.tail;
                    for(let i = this.size - 1; i > idx; i--){
                        temp = temp.prev;
                    }
                    return temp;
                }
            }
        }

        removeFirst(): Node<T> | any{
            if(this.size == 0){
                console.log("List underflow");
                return null;
            }else if(this.size === 1){
                const node = this.head;
                this.head = this.tail = null;
                this.size = 0;
                return node;
            }else{
                const node = this.head;
                this.head.prev = null;
                this.head = this.head.next;
                node.next = null;
                this.size--;
                return node;
            }
        }

        removeLast(): Node<T> | any {
            if(this.size === 0){
                console.log("List underflow");
            }else if(this.size == 1){
                const node = this.head;
                this.head = this.tail = null;
                this.size--;
                return node;
            }else{
                const node = this.tail;
                this.tail = this.tail.prev;
                this.tail.next = null;
                node.prev = null;
                this.size--;
                return node;
            }
        }

        removeAt(idx: number): Node<T> | any{
            if(this.size === 0){
                console.log("List underflow");
                return;
            }else if(idx >= this.size){
                console.log("List Index out of bound");
                return; 
            }else if(idx === 0){
                return this.removeFirst();
            }else if(idx == this.size - 1){
                return this.removeLast();
            }else{
                if(idx <= this.size/2){
                    let temp:Node<T> = this.head;
                    for(let i = 0; i < idx; i++){
                        temp = temp.next;
                    }
                    temp.prev.next = temp.next;
                    temp.next.prev = temp.prev;
                    temp.next = temp.prev = null;
                    this.size--;
                    return temp;
                }else{
                    let temp:Node<T> = this.tail;
                    for(let i = this.size - 1; i > idx; i--){
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

        display(): void{
            if(this.size === 0){
                console.log("List empty");
                return;
            }
            let temp = this.head;
            while(temp != null){
                console.log(temp.data);
                temp = temp.next;
            }
        }

        *[Symbol.iterator](){
            if(this.size === 0){
                return;
            }
            let temp = this.head;
            while(temp != null){
                yield temp.data;
                temp = temp.next;
            }
        }
    }
}

let linkedList: CustomLinkedList.LinkedList<number> = new CustomLinkedList.LinkedList();
linkedList.addLast(77);
linkedList.addLast(88);
linkedList.addLast(10);
linkedList.addLast(45);
linkedList.addLast(23);
linkedList.addLast(90);
console.log('\n');
linkedList.display();
console.log('\n');
(async() => {
    CustomLinkedList.Collections.sort(linkedList, function(a: CustomLinkedList.Node<number>, b: CustomLinkedList.Node<number>) : number{
        return a.data < b.data ? -1 : a.data > b.data ? 1 : 0;
    });
    for await(const data of linkedList){
        console.log(data);
    }
})();
