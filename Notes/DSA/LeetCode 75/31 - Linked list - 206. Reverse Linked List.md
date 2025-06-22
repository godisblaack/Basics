Link: https://leetcode.com/problems/reverse-linked-list/description/

**My solution**

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (head == nullptr || head->next == nullptr) {
            return head;
        } else if (head->next->next == nullptr) {
            ListNode* newHead = head->next;

            head->next->next = head;
            head->next = nullptr;

            return newHead;
        }

        ListNode* previous = head;
        ListNode* current = head->next;
        ListNode* next = head->next->next;

        while (next != nullptr) {
            current->next = previous;

            previous = current;
            current = next;
            next = next->next;
        }

        current->next = previous;
        head->next = nullptr;

        head = current;

        return head;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1) 

This is the **optimized** solution. This solution is know as **Iterative solution**, there is a better way to write it. The code is below:

**Standard iterative solution**

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* current = head;
        ListNode* next = nullptr;

        while (current != nullptr) {
            next = current->next; // Store the next node
            current->next = prev; // Reverse the current node's pointer
            prev = current;       // Move prev one step forward
            current = next;       // Move current one step forward
        }
        return prev; // prev is the new head
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)

There is another way to solve it know as **recursive solution**. The code is below:

**Standard recursive solution:**

```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (head == nullptr || head->next == nullptr) {
            return head;
        }
        ListNode* newHead = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return newHead;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N), due to the recursive call stack.