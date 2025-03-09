# Slime-Mold

![Slime Mold Preview](media/slime-mold-demo.gif)

This simulation is based on the paper of how Physarum (slime mold) moves.
The references can be found at the end.

## How it works

- Each particle has 3 sensors: **front**, **left** and **right** (the angle between the front and sides can be changed).

- The sensor with the highest intensity of the trail dictates where the particle will go. (In this case, the intesity measured by the sensor is basically how white that sensor pixel is.)

- After that, the particle moves and leaves a trail.

This repeats over and over again, resulting in patterns.

### References
<a href="https://cargocollective.com/sagejenson/physarum">Sage Jenson's explanation</a>
<br>
<a href="https://uwe-repository.worktribe.com/OutputFile/980585">Original Paper, by Jeff Jones</a>
