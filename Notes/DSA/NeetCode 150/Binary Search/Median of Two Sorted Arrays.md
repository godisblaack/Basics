Link: https://leetcode.com/problems/median-of-two-sorted-arrays/description/

**My solution**

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        for (int num : nums2) {
            nums1.push_back(num);
        }

        sort(nums1.begin(), nums1.end());

        int size = nums1.size();

        if (size % 2 == 0) {
            return (double)(nums1[(size / 2) - 1] + nums1[size / 2]) / 2;
        } else {
            return nums1[size / 2];
        }
    }
};
```

**Time complexity:** O((m+n) log(m+n)), where m is the size of the nums1, and n is the size of the nums2.

**Space complexity:** O(1)

This is **not** the optimized solution.

**Optimized solution**

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& A, vector<int>& B) {
        if (A.size() > B.size()) {
            return findMedianSortedArrays(B, A);
        }

        int m = A.size(), n = B.size();
        int low = 0, high = m;

        while (low <= high) {
            int i = (low + high) / 2;
            int j = (m + n + 1) / 2 - i;

            int maxLeftA;
            if (i == 0) {
                maxLeftA = INT_MIN;
            } else {
                maxLeftA = A[i - 1];
            }

            int minRightA;
            if (i == m) {
                minRightA = INT_MAX;
            } else {
                minRightA = A[i];
            }

            int maxLeftB;
            if (j == 0) {
                maxLeftB = INT_MIN;
            } else {
                maxLeftB = B[j - 1];
            }

            int minRightB;
            if (j == n) {
                minRightB = INT_MAX;
            } else {
                minRightB = B[j];
            }

            if (maxLeftA <= minRightB && maxLeftB <= minRightA) {
                if ((m + n) % 2 == 0) {
                    return (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2.0;
                } else {
                    return max(maxLeftA, maxLeftB);
                }
            } else if (maxLeftA > minRightB) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }

        throw invalid_argument("Input arrays are not sorted.");
    }
};
```

**Time complexity:** O(log min(m+n)), where m is the size of the nums1, and n is the size of the nums2.

**Space complexity:** O(1)