Link: https://leetcode.com/problems/reorder-list/description/

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
    void reorderList(ListNode* head) {
        vector<int> list;

        ListNode* track = head;

        while (track != nullptr) {
            list.push_back(track->val);

            track = track->next;
        }

        int left = 1;
        int right = list.size() - 1;

        track = head;

        int go_left = false;

        while (left <= right) {
            ListNode* temp = new ListNode();

            if (go_left) {
                temp->val = list[left];

                left++;
            } else {
                temp->val = list[right];

                right--;
            }

            go_left = !go_left;

            track->next = temp;
            track = temp;
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is **not** the optimized solution.

**Better solution - Using extra space but resuing nodes**

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
    void reorderList(ListNode* head) {
        if (!head) {
            return;
        }

        vector<ListNode*> nodes;

        ListNode* temp = head;

        while (temp) {
            nodes.push_back(temp);

            temp = temp->next;
        }

        int left = 0;
        int right = nodes.size() - 1;

        while (left < right) {
            nodes[left]->next = nodes[right];

            left++;

            if (left == right) {
                break;
            }

            nodes[right]->next = nodes[left];

            right--;
        }

        nodes[left]->next = nullptr;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

**Optimized solution**

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
    void reorderList(ListNode* head) {
        if (!head || !head->next || !head->next->next) {
            return;
        }

        // Step 1: Find middle
        ListNode* slow = head, *fast = head;

        while (fast->next && fast->next->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // Step 2: Reverse second half
        ListNode* previous = nullptr, *current = slow->next;

        while (current) {
            ListNode* next = current->next;
            current->next = previous;
            previous = current;
            current = next;
        }
        
        slow->next = nullptr;

        // Step 3: Merge two halves
        ListNode* first = head, *second = previous;

        while (second) {
            ListNode* temp1 = first->next;
            ListNode* temp2 = second->next;

            first->next = second;
            second->next = temp1;

            first = temp1;
            second = temp2;
        }
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)