Link: https://leetcode.com/problems/maximum-twin-sum-of-a-linked-list/description/

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
    int pairSum(ListNode* head) {
        vector<int> array;

        ListNode* temp = head;
        
        while (temp != nullptr) {
            array.push_back(temp->val);

            temp = temp->next;
        }

        int maxTwinSum = 0;
        
        int n = array.size();

        for (int i = 0; i < n; i++) {
            if (i >= 0 && i <= (n/2) - 1) {
                int twinSum = array[i] + array[n - 1 - i];

                if(twinSum > maxTwinSum) {
                    maxTwinSum = twinSum;
                }
            }
        }
        
        return maxTwinSum;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(N)

This is **not** the optimized solution. I was able to reduce the space complexity to O(1), but I got TLE error, the following code is below:

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
    int pairSum(ListNode* head) {
        ListNode* temp = head;

        int listLength = 0;

        while (temp != nullptr) {
            listLength++;

            temp = temp->next;
        }

        int maxTwinSum = 0;

        int n = listLength;

        for (int i = 0; i < n; i++) {
            ListNode* currentNode = head;
            
        
            if (i >= 0 && i <= (n/2) - 1) {
                int count = i;

                while (count > 0) {
                    currentNode = currentNode->next;

                    count--;
                }

                ListNode* twinNode = currentNode;

                count = n - 1 - i - i;

                while (count > 0) {
                    twinNode = twinNode->next;

                    count--;
                }

                int twinSum = currentNode->val + twinNode->val;

                if(twinSum > maxTwinSum) {
                    maxTwinSum = twinSum;
                }
            }
        }
        
        return maxTwinSum;
    }
};
```

**Time complexity:** O($N^{2}$)

**Space complexity:** O(1)

I was **not** able to optimized it further, so I saw the video solution.

**Optimized solution**

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 * int val;
 * ListNode *next;
 * ListNode() : val(0), next(nullptr) {}
 * ListNode(int x) : val(x), next(nullptr) {}
 * ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    int pairSum(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        ListNode* prev = nullptr;

        // Find the middle and reverse the first half
        while (fast != nullptr && fast->next != nullptr) {
            fast = fast->next->next;
            ListNode* nextNode = slow->next;
            slow->next = prev;
            prev = slow;
            slow = nextNode;
        }

        int maxTwinSum = 0;
        ListNode* firstHalf = prev;
        ListNode* secondHalf = slow;

        // Calculate twin sums
        while (secondHalf != nullptr) {
            int currentSum = firstHalf->val + secondHalf->val;
            maxTwinSum = std::max(maxTwinSum, currentSum);
            firstHalf = firstHalf->next;
            secondHalf = secondHalf->next;
        }

        return maxTwinSum;
    }
};
```

**Time complexity:** O(N)

**Space complexity:** O(1)