EXPERIENCES = [100, 200, 400, 700, 1000, 1500, 2000]

def add_experience(level, xp, gained_xp):
    
    while gained_xp > 0 and level < len(EXPERIENCES):
        needed = EXPERIENCES[level] - xp
        if gained_xp >= needed:
            gained_xp -= needed
            level += 1
            xp = 0
        else:
            xp += gained_xp
            gained_xp = 0
            
    return level, xp
