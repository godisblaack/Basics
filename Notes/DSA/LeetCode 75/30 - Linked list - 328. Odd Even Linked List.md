Link: https://leetcode.com/problems/odd-even-linked-list/description/

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
    ListNode* oddEvenList(ListNode* head) {
        if (head == nullptr || head->next == nullptr || head->next->next == nullptr) {
            return head;
        }

        vector<int> nodeData;

        ListNode* temp = head;

        while (temp != nullptr && temp->next != nullptr) {
            nodeData.push_back(temp->val);

            temp = temp->next->next;
        }

        if (temp != nullptr) {
            nodeData.push_back(temp->val);
        }

        temp = head->next;

        while (temp != nullptr && temp->next != nullptr) {
            nodeData.push_back(temp->val);

            temp = temp->next->next;
        }

        if (temp != nullptr) {
            nodeData.push_back(temp->val);
        }

        temp = head;

        for (int i = 0; i < nodeData.size() && temp != nullptr; i++) {
            temp->val = nodeData[i];
            temp = temp->next;
        }

        return head;
    }
};
```

**Time complexity:** O(2N) = O(N)

**Space complexity:** O(N)

I was not able to come up with the optimal solution. I watched a video and coded it myself.

**Optimal solution**

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
    ListNode* oddEvenList(ListNode* head) {
        if (head == nullptr || head->next == nullptr || head->next->next == nullptr) {
            return head;
        }

        ListNode* oddNode = head;
        ListNode* evenNode = head->next;
        ListNode* evenHead = evenNode;

        while (evenNode != nullptr && evenNode->next != nullptr) {
            oddNode->next = oddNode->next->next;
            evenNode->next = evenNode->next->next;

            oddNode = oddNode->next;
            evenNode = evenNode->next;
        }

        oddNode->next = evenHead;

        return head;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)