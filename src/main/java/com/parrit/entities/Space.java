package com.parrit.entities;

import javax.persistence.*;
import java.util.List;

@Entity
public class Space {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(targetEntity = Person.class)
    @JoinColumn(name="space_id")
    private List<Person> people;

    private String name;

    public Space() {}

    public Space(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Person> getPeople() {
        return people;
    }

    public void setPeople(List<Person> people) {
        this.people = people;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Space space = (Space) o;

        if (id != space.id) return false;
        if (people != null ? !people.equals(space.people) : space.people != null) return false;
        return name != null ? name.equals(space.name) : space.name == null;
    }

    @Override
    public String toString() {
        return "Space{" +
                "id=" + id +
                ", people=" + people +
                ", name='" + name + '\'' +
                '}';
    }
}
