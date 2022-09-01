# daily calendar events

usage of react and complex algorithm function to lay out a series of events on the calendar for a single day.
the requirements:

1. Events will be placed in a container. The top of the container represents 9am and the bottom represents 9pm.
2. The width of the container will be 600px and the height will be 720px (1 pixel for every minute between 9am and 9pm).
For example: 9am = 0; 10am=60; 1:20pm=260

The objects should be laid out so that they do not visually overlap.
If there is only one event at a given time slot, its width should be 600px.

There are 2 major constraints:
- Events should use the maximum width possible without overlapping.
- Every colliding event should be the same width as every other event that itcollides with, while still adhering to the first constraint.

![image](https://user-images.githubusercontent.com/57454459/187918941-98d9ef64-a487-48d9-a3f3-4e2d1035c51d.png)
