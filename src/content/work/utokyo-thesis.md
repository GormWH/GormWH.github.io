---
title: "Master's thesis — PCA + CFD on cerebral vascular shape"
description: "PCA + CFD pipeline: 104 cerebral-artery centerlines from 64 subjects, compressed into three shape clusters, then CFD on each cluster's mean shape to link vessel torsion with wall shear stress. Defended at U-Tokyo, March 2023."
date: 2023-03-25
org: "U-Tokyo"
tags: ["Research", "CFD", "PCA"]
important: true
---

- **Dataset:** 104 ICA → MCA centerline segments, 64 subjects, BraVa database
- **Pipeline:** resample + Procrustes → PCA (256-D → 3-D) → K-means (k=3) → mean-shape reconstruction → CFD
- **Variance captured:** PC1–PC3 retain 75.1% of total shape variance
- **CFD:** incompressible Navier-Stokes, FVM with PISO coupling, Re ∈ {250, 300, 350}
- **Advisor:** Prof. Mari Oshima, U-Tokyo · Defended March 2023

Cerebral aneurysm risk is driven by local hemodynamics, but per-patient CFD doesn't scale: every brain is a multi-hour simulation. The thesis takes the opposite approach — compress the vessel-shape population first, cluster it into a small number of representative shapes, then simulate only those means. The clean result that fell out of it: a continuous statistical axis ended up tracking a categorical dynamical regime.

## Why this framing

Vessel geometry dominates the local flow. If the geometry compresses to a few numbers, the analysis moves from "every brain is its own problem" to "shape classes have shape-class dynamics" — which is the unit a clinician can reason about. I represented each vessel as 64 resampled centerline nodes with their radii (256-D per vessel), aligned the population with Generalized Procrustes Analysis, then ran PCA. Three components captured 75.1% of the variance — enough to cluster meaningfully, and the missing quarter turned out to matter later. K-means at k=3 gave shape families C0, C1, C2 with populations 59 · 36 · 9.

## The result that stuck

For each cluster I reconstructed the mean shape, fit a B-spline to its centerline, computed curvature and torsion, and ran CFD on the meshed vessel at three Reynolds numbers. The clusters split along one interpretable axis:

- C0 and C1 had four bends; their first bend showed a sign reversal in torsion, and exactly there the secondary flow rolled up into a vortex with a wall-shear-stress spike on the inner wall.
- C2 had three bends and no torsion reversal at the first bend. The flow stayed as secondary flow without forming a vortex, and the peak WSS migrated to the narrow outlet instead.

Tracing it back through PC1, the first principal component turned out to control where bend1 sits — which then governs whether the torsion flips, which then decides whether the vortex forms. A statistical axis tracks a categorical regime, and the chain is short enough to be checkable end to end.

## What I'd change today

The thesis's own conclusion names two honest limits, and they are still the right ones to name. First, the broader goal — parameterize hemodynamics, not just shape — wasn't reached. PCA gave clean axes for the geometry; it did not extend cleanly to the WSS field, and the quarter of variance left outside PC1–PC3 is part of why. Today I would reach for a learned mapping from cluster-mean geometry to the WSS field rather than expecting WSS to inherit the PCA basis. Second, the 3D walls were reconstructed by marching cubes from the centerline, and small kinks in the centerline produced a zebra pattern in WSS near the wall. The fix is upstream: smooth the centerline globally, or skip marching cubes and treat the vessel as a swept B-spline tube. Lastly, k=3 was picked by inspection; today I would defend the cluster count against a statistical criterion.
