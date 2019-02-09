<template>
  <div class="hello">
    <h1>Gerenciamento de Usuários</h1>
    <div>
      <table>
      <thead>
        <tr>
          <th>nome</th>
          <th>email</th>
          <th>senha</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users.data" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
          <td>
            <a href="#" @click.prevent="remove(user._id)">x</a>
            -
            <a href="#" @click.prevent="toUpdate(user)">update</a>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <form @submit.prevent="save()">
      <div>
        <div>
          <input type="text" placeholder="Nome" v-model="toSave.name">
        </div>
        <div>
          <input type="text" placeholder="Email" v-model="toSave.email">
        </div>
        <div>
          <input type="text" placeholder="Senha" v-model="toSave.password">
        </div>
        <div>
          <input type="submit" value="+">
        </div>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'HelloWorld',
  data () {
    return {
      users: {data: []},
      toSave: {},
      updateStatus: false
    }
  },
  methods: {
    save() {
      if (this.updateStatus) {
        this.update()
      } else {
        this.create()
      }
    },
    getList(){
      window.axios.get('/api/users')
        .then((res) => {
          this.users = res.data
          console.log(res)
        })
    },
    remove(id){
      window.axios.delete('/api/users/' + id)
        .then(() => {
          this.getList()
        })
    },
    create() {
      window.axios.post('/api/users', this.toSave).then(
        () => {
          this.toSave = {}
          this.getList()
        }
      ) 
    },
    update() {
      window.axios.put('/api/users/' + this.toSave._id, this.toSave).then(
        () => {
          this.toSave = {}
          this.updateStatus = false
          this.getList()
        }
      ) 
    },
    toUpdate(user) {
      this.updateStatus = user._id
      this.toSave = user
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style scoped>

</style>
